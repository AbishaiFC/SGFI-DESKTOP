import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GetPendingSale } from '../../../shared/models/sales/sale';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ProductsPipe } from '../../../shared/pipes/productsPipe';
import { SalesService } from '../../../core/services/sales/sales-service';
import { AlertsService } from '../../../core/services/alerts/alerts-service';
import { SalesStore } from '../../../core/stores/sales/sales-store';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { CurrentEmpty } from "../current-empty/current-empty";
import { CurrentCartItem } from "../current-cart-item/current-cart-item";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-current-cart',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, MatChipsModule, CommonModule, ProductsPipe, CurrentEmpty, CurrentCartItem, MatProgressBarModule],
  templateUrl: './current-cart.html',
  styleUrl: './current-cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentCart {
  private readonly salesService = inject(SalesService);
  private readonly alertsService = inject(AlertsService);
  private readonly salesStore = inject(SalesStore);

  // Input de carga del padre
  isLoading = input<boolean>(false);

  // Signal interna para operaciones de este componente
  private readonly operationLoading = signal<boolean>(false);

  // Computed que combina ambos estados de carga
  protected isAnyOperationInProgress = computed(() => 
    this.isLoading() || this.operationLoading()
  );

  // Input que espera los datos de una venta en progreso
  dataSale = input<GetPendingSale | null>();

  // Extraer los productos el signal anidado
  productsSale = computed(() => {
    const sale = this.dataSale();
    if(!sale) return [];
    return sale?.products ?? []
  });

  // Extraer el Identificador único de la venta pendiente
  saleId = computed(() => {
    const sale = this.dataSale();
    if(!sale) return null;
    return sale?.pending_transaction_id ?? null;
  });

  // Calculo reactivo para el total de productos
  totalQuantity = computed(() => {
    return this.productsSale().reduce((sum, product) => sum + product.quantity, 0);
  });

  // Cálculo reactivo para el total de la venta
  totalAmount = computed(() => {
    return this.productsSale().reduce((sum, product) => sum + (product.price * product.quantity), 0)
  })

  // Función para incrementar la cantidad de un producto a vender
  incrementProduct(itemId: string, quantity: number): void {
    this.operationLoading.set(true)

    this.salesService.updateItemSale(this.saleId()!,itemId ,(quantity + 1))
    .pipe(
      switchMap(() => this.salesStore.loadItems(this.saleId()!)),
      finalize(() => this.operationLoading.set(false)),
      catchError((err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido añadir un elemento mas del producto', 'Stock insuficiente');
        return EMPTY;
      }),
    )
    .subscribe()
  }
  
  // Función para decrementar la cantidad de un producto a vender
  decrementProduct(itemId: string, quantity: number): void {
    
    // Si al decrementar llegamos a 0 eliminamos el producto
    if (quantity - 1 === 0) {
      this.deleteProduct(itemId);
      return;
    }

    this.operationLoading.set(true);

    this.salesService.updateItemSale(this.saleId()!,itemId ,(quantity - 1))
    .pipe(
      switchMap(() => this.salesStore.loadItems(this.saleId()!)),
      finalize(() => this.operationLoading.set(false)),
      catchError((err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido eliminar un elemento del producto, intente nuevamente', 'Error interno');
        return EMPTY;
      })
    )
    .subscribe()
  }
  
  // Función para eliminar un producto a vender
  deleteProduct(itemId: string): void {
    this.operationLoading.set(true);

    this.salesService.deleteItemSale(this.saleId()!, itemId)
    .pipe(
      switchMap(() => this.salesStore.loadItems(this.saleId()!)),
      finalize(() => this.operationLoading.set(false)),
      catchError((err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido eliminar el producto de la venta, intente nuevamente', 'Error interno');
        return EMPTY;
      })
    )
    .subscribe()
  }
}
