import { inject, Injectable } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetProduct } from '../../../shared/models/inventory/products';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class InventoryStore {
  /**
   * Servicio para obtener los datos de mi cold observable
   * y convertirlos a hot observables con ayuda de signals
   * para mayor reactividad
   */

  // Servicio de Inventario
  private readonly inventoryService = inject(InventoryService);

  // Signal privado para manejar el estado
  private inventorySubject = new BehaviorSubject<GetProduct[] | null>(null);

  // Signal público de solo lectura
  readonly products = toSignal(this.inventorySubject.asObservable(), {
    initialValue: null
  })

  /**
   * Carga los datos de los productos y actualiza el signal
   */
  loadInventory(): Observable<GetProduct[]>{
    return this.inventoryService.fetchAll().pipe(
      tap(products => this.inventorySubject.next(products))
    );
  }
}
