import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { CurrentEmpty } from "../current-empty/current-empty";
import { CartEmpty } from "../cart-empty/cart-empty";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { InventoryStore } from '../../../core/stores/inventory/inventory-store';
import { CurrentInventory } from "../current-inventory/current-inventory";
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../../core/services/websockets/websocket-service';
import { WebsocketStore } from '../../../core/stores/websockets/websocket-store';
import { SalesService } from '../../../core/services/sales/sales-service';
import { Button } from "../../../shared/components/button/button";
import { AlertsService } from '../../../core/services/alerts/alerts-service';
import { SaleIdStore } from '../../../core/stores/sales/sale-id-store';
import { SalesStore } from '../../../core/stores/sales/sales-store';
import { CurrentCart } from "../current-cart/current-cart";
import { ProductSale, ProductsSale } from '../../../shared/models/sales/sale';
import { BehaviorSubject, catchError, concatMap, EMPTY, finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-current',
  imports: [Title, GrayCard, CurrentEmpty, CartEmpty, MatIconModule, MatButtonModule, RouterModule, RedirectButton, CurrentInventory, CommonModule, Button, CurrentCart],
  templateUrl: './current.html',
  styleUrl: './current.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Current implements OnInit, OnDestroy {
  private readonly inventoryStore = inject(InventoryStore);
  private readonly salesService = inject(SalesService);
  private readonly salesStore = inject(SalesStore);
  private readonly saleIdStore = inject(SaleIdStore);
  private readonly websocketService = inject(WebsocketService);
  private readonly websocketStore = inject(WebsocketStore);
  private readonly alertsService = inject(AlertsService);

  /**
   * ==================================
   *         Signals pùblicos
   * ==================================
   */
  protected saleId = signal<string>('');
  public readonly products = this.inventoryStore.products;
  public readonly pendingSale = this.salesStore.items;
  public readonly isLoading = signal<boolean>(false);
 
  /**
   * ==================================
   *    Sistema de encolamiento
   * ==================================
   */
  // Subject para encolar productos del WebSocket
  private readonly addProductQueue$ = new Subject<ProductsSale>();
  
  // Subject para controlar operaciones en curso
  private readonly operationInProgress$ = new BehaviorSubject<boolean>(false);


  constructor() {
    this.setupProductQueue();
    this.setupWebSocketEffect();
  }

  /**
   * =============================
   * Ciclo de vida del componente
   * =============================
   */
  ngOnInit(): void {
    // Conectar WebSocket
    this.websocketService.connect();

    // Cargar inventario
    this.loadInventory();

    // Recuperar venta pendiente si existe
    this.recoverPendingSale();
  }

  ngOnDestroy(): void {
    this.websocketService.closeConnection();

    // Completar subjects
    this.addProductQueue$.complete();
    this.operationInProgress$.complete();
  }

  /**
   * =============================
   *      Funciones de la UI
   * =============================
   */
  newSale(): void {
    this.isLoading.set(true);
    this.salesService.createSale([]).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (res) => {
        const newSaleId = res.data.transaction_id;
        this.saleId.set(newSaleId)
        this.saleIdStore.setId(newSaleId);
        this.alertsService.success('Nueva venta en curso');
      },
      error: (err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido iniciar el proceso para una nueva venta. Por favor, intenta de nuevo','Error al crear una nueva venta');
      }
    });
  }
  
  registerSale(): void {
    this.isLoading.set(true);

    // Cerramos WebSocket y limpiamos el buffer de productos
    this.websocketService.closeConnection();
    this.websocketStore.clearSalesBarcode();

    this.salesService.confirmSale(this.saleId()).pipe(
      finalize(() => {
        this.isLoading.set(false);
        this.websocketService.connect();
      })
    ).subscribe({
      next: () => {
        this.clearSaleId()
        this.alertsService.success('Se ha confirmado con éxito la nueva venta realizada', 'Venta exitosa');
      },
      error: (err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido completar el proceso para confirmar la venta. Por favor, intenta de nuevo','Error al confirmar la venta');
      }
    });
  }
  
  deleteSale(): void {
    this.isLoading.set(true);
    // Para evitar que en caso de cancelar una venta un nuevo producto cree una nueva venta
    this.websocketService.closeConnection();
    this.websocketStore.clearSalesBarcode()

    this.salesService.cancelSale(this.saleId()).pipe(
      finalize(() =>{ 
        this.isLoading.set(false);
        this.websocketService.connect();
      })
    ).subscribe({
      next: () => {
        this.clearSaleId();
        this.alertsService.success('Se ha cancelado con éxito la venta',);
      },
      error: (err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido completar el proceso para cancelar la venta. Por favor, intenta de nuevo','Error al cancelar la venta');
      }
    });
  }

  addProduct(product: ProductsSale): void{
    this.isLoading.set(true);
    const productData: ProductSale = {name: product.name, price: product.price}
    this.salesService.addItemSale(this.saleId(), product.item_id, productData).pipe(
      switchMap(() => this.salesStore.loadItems(this.saleId())),
      finalize(() => this.isLoading.set(false)),
      catchError((err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se pudo añadir el producto escaneado');
        return EMPTY;
      })
    )
    .subscribe()
  }

  /**
   * Configura el sistema de encolamiento de productos
   * - Procesa un producto a la vez (concatMap)
   * - Maneja creación de venta si no existe
   * - Maneja errores sin detener la cola
   */
  private setupProductQueue(): void {
    this.addProductQueue$
      .pipe(
        // Procesar productos secuencialmente
        concatMap(product => {
          const currentSaleId = this.saleId();
          
          // Si no hay venta activa, crear una nueva con el producto
          if (!currentSaleId) {
            return this.createSaleWithProduct(product);
          }
          
          // Si ya existe venta, solo agregar el producto
          return this.addProductToSale(product, currentSaleId);
        }),
        // Continuar procesando aunque haya errores
        catchError((err: Error) => {
          console.error('Error en la cola de productos:', err.message);
          this.alertsService.error('Error procesando producto');
          // Retornar EMPTY para continuar con el siguiente producto
          return EMPTY;
        }),
        // Limpiar suscripción cuando el componente se destruya
        takeUntilDestroyed()
      )
      .subscribe();
  }

  /**
   * Configura el effect que escucha productos del WebSocket
   * Solo encola productos, NO ejecuta lógica de negocio
   */
  private setupWebSocketEffect(): void {
    effect(() => {
      const product = this.websocketStore.salesBarcode();
      
      if (product) {
        // Encolar el producto para procesamiento
        this.addProductQueue$.next(product);
        
        // Limpiar inmediatamente para evitar reprocesamiento
        this.websocketStore.clearSalesBarcode();
      }
    });
  }

  /**
   * Crea una nueva venta e incluye el primer producto
   */
  private createSaleWithProduct(product: ProductsSale): Observable<void> {
    this.isLoading.set(true);
    this.operationInProgress$.next(true);

    return this.salesService.createSale([product]).pipe(
      tap((response) => {
        // Guardar el ID de la nueva venta
        const newSaleId = response.data.transaction_id;
        this.saleId.set(newSaleId);
        this.saleIdStore.setId(newSaleId);
      }),
      // Cargar los items de la venta recién creada
      switchMap((response) => 
        this.salesStore.loadItems(response.data.transaction_id)
      ),
      tap(() => {
        this.alertsService.success('Nueva venta iniciada con producto');
      }),
      // Limpiar estado de carga
      finalize(() => {
        this.isLoading.set(false);
        this.operationInProgress$.next(false);
      }),
      // Manejo de errores
      catchError((err: Error) => {
        console.error('Error creando venta con producto:', err.message);
        this.alertsService.error(
          'No se pudo iniciar la venta. Escanea el producto nuevamente'
        );
        // Retornar EMPTY para no romper la cadena
        return EMPTY;
      }),
      // Mapear a void para consistencia
      map(() => void 0)
    );
  }

  /**
   * Agrega un producto a una venta existente
   */
  private addProductToSale(
    product: ProductsSale, 
    saleId: string
  ): Observable<void> {
    this.isLoading.set(true);
    this.operationInProgress$.next(true);

    const productData: ProductSale = {
      name: product.name,
      price: product.price
    };

    return this.salesService.addItemSale(saleId, product.item_id, productData).pipe(
      // Recargar items de la venta para reflejar cambios
      switchMap(() => this.salesStore.loadItems(saleId)),
      finalize(() => {
        this.isLoading.set(false);
        this.operationInProgress$.next(false);
      }),
      catchError((err: Error) => {
        console.error('Error agregando producto:', err.message);
        
        // Mensajes específicos según el error
        if (err.message.includes('stock')) {
          this.alertsService.error('Stock insuficiente del producto');
        } else if (err.message.includes('not found')) {
          this.alertsService.error('La venta ya no existe');
          this.clearSaleId();
        } else {
          this.alertsService.error('No se pudo agregar el producto');
        }
        
        return EMPTY;
      }),
      map(() => void 0)
    );
  }

  /**
   * ==================================
   *        Métodos auxiliares
   * ==================================
   */

  private loadInventory(): void {
    this.inventoryStore.loadInventory().subscribe({
      error: (err: Error) => {
        console.error('Error cargando inventario:', err.message);
        this.alertsService.error('Error al cargar el inventario');
      }
    });
  }

  private recoverPendingSale(): void {
    const storageSaleId = this.saleIdStore.getId();

    if (!storageSaleId) {
      return;
    }

    this.isLoading.set(true);
    this.saleId.set(storageSaleId);

    this.salesStore.loadItems(storageSaleId).pipe(
      finalize(() => this.isLoading.set(false)),
      catchError((err: Error) => {
        console.error('Error cargando venta pendiente:', err.message);
        this.clearSaleId();
        this.alertsService.error(
          'La venta pendiente no existe o expiró'
        );
        return EMPTY;
      })
    ).subscribe();
  }

  private clearSaleId(): void{
    this.saleIdStore.clearId()
    this.saleId.set('')
  }
}
