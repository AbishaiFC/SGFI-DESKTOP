import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GetPendingSale, GetSale, ProductSale, ProductsSale } from '../../../shared/models/sales/sale';
import { handleHttpError } from '../../../shared/operators/http-error.operator';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  /**
   * Clase SalesService:
   * Gestiona las rutas para el manejo de la ventas en progreso y registradas
   */


  // Url del backend
  private readonly baseUrl: string = `${environment.apiUrl}/sales`;

  // Libreria para peticiones http
  private readonly http = inject(HttpClient);

  /**
   * Método para obtener todas las ventas registradas ya completadas
   * @returns GetSale[] -> Lista de todas las ventas completadas
   * - sale_id: ID único de la venta
   * - products: Array de productos vendidos
   * - timestamps: Fecha exacta del registro de la venta completada
   */
  fetchAll(): Observable<GetSale[]> {
    return this.http.get<GetSale[]>(`${this.baseUrl}`).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Obtener ventas')
    )
  }
  
  /**
   * Método para registrar una nueva venta en progreso
   * @param sale ProductsSale[] Array de productos de la nueva venta
   * - item_id: ID único del producto
   * - name: Nombre del producto
   * - price: Precio del producto
   * - quantity: Cantidad a vender del producto
   * @returns Observable con la respuesta del backend.
   */
  createSale(sale: ProductsSale[]): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, sale).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Registrar venta')
    )
  }

  /**
   * Método para registrar una venta completada
   * @param saleId ID único de la venta en progreso
   * @returns Observable con la respuesta del backend.
   */
  confirmSale(saleId: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${saleId}/confirm`, {}).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Confirmar venta')
    )
  }

  /**
   * Método para cancelar una venta en progreso
   * @param saleId ID único de la venta en progreso
   * @returns Observable con la respuesta del backend.
   */
  cancelSale(saleId: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${saleId}/cancel`, {}).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Cancelar venta')
    )
  }


  /**
   * Método para obtener los items de una venta en progreso
   * @param saleId ID único de la venta en progreso
   * @returns GetPendingSale -> Modelo de una venta en progreso
   * pendind_transaction_id: ID único de la venta en progreso
   * products: Array de los productos de la venta en progreso
   */
  fetchItems(saleId: string): Observable<GetPendingSale>{
    return this.http.get<GetPendingSale>(`${this.baseUrl}/${saleId}/items`).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Obtener productos')
    )
  }

  /**
   * Método para añadir un item a una venta en progreso
   * @param saleId ID único de la venta en progreso
   * @param itemId ID único del producto
   * @param item ProductSale -> Modelo del item a añadir
   * name: Nombre del producto
   * price: Precio del producto
   * @returns Observable con la respuesta del backend.
   */
  addItemSale(saleId: string, itemId: string, item: ProductSale): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${saleId}/items/${itemId}`, item).pipe(
      tap(
          response => {
          console.log(response)
        }
      ),
      handleHttpError('Añadir producto')
    )
  }

  /**
   * Método para añadir un item a una venta en progreso
   * @param saleId ID único de la venta en progreso
   * @param itemId ID único del producto
   * @param quantity Cantidad del producto a vender
   * @returns Observable con la respuesta del backend.
   */
  updateItemSale(saleId: string, itemId: string, quantity: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${saleId}/items/${itemId}`, quantity).pipe(
      tap(
          response => {
          console.log(response)
        }
      ),
      handleHttpError('Actualizar cantidad a vender de producto')
    )
  }

  /**
   * Método para añadir un item a una venta en progreso
   * @param saleId ID único de la venta en progreso
   * @param itemId ID único del producto
   * @returns Observable con la respuesta del backend.
   */
  deleteItemSale(saleId: string, itemId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${saleId}/items/${itemId}`).pipe(
      tap(
          response => {
          console.log(response)
        }
      ),
      handleHttpError('Añadir producto')
    )
  }

  /**
   * Método para leer un código de barras para añadirlo a una venta en progreso
   * @param barcode Código de barras del producto
   * @returns Observable con la respuesta del backend.
   */
  barcodeItemSale(barcode: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/items/barcode`, barcode).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Leer Código de Barras del producto')
    )
  }

}
