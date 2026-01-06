import { inject, Injectable } from '@angular/core';
import { SalesService } from '../../services/sales/sales-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetPendingSale, GetSale, ProductsSale } from '../../../shared/models/sales/sale';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetProduct } from '../../../shared/models/inventory/products';

@Injectable({
  providedIn: 'root',
})
export class SalesStore {
  /**
   * Servicio para obtener los datos de mi cold observable
   * y convertirlos a hot observables con ayuda de signals
   * para mayor reactividad
   */

  // Servicio de Ventas
  private readonly salesService = inject(SalesService);

  // Signal privado para manejar elestado de las ventas confirmadas
  private salesSubject = new BehaviorSubject<GetSale[] | null>(null);

  // Signal público de solo lectura
  readonly sales = toSignal(this.salesSubject.asObservable(), {
    initialValue: null
  })

  /**
   * Carga los datos de las ventas confirmadas y actualiza el signal
   */
  loadSales(): Observable<GetSale[]>{
    return this.salesService.fetchAll().pipe(
      tap(sales => this.salesSubject.next(sales))
    );
  }
  

  // Signal privado para manejar elestado de los productos de una venta en progreso
  private itemsSubject = new BehaviorSubject<GetPendingSale | null>(null);

  // Signal público de solo lectura
  readonly items = toSignal(this.itemsSubject.asObservable(), {
    initialValue: null
  })

  /**
   * Carga los productos de una venta en progreso
   */
  loadItems(saleId: string): Observable<GetPendingSale>{
    return this.salesService.fetchItems(saleId).pipe(
      tap(sale => this.itemsSubject.next(sale))
    );
  }
  
}
