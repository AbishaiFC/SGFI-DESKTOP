import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { handleHttpError } from '../../../shared/operators/http-error.operator';
import { CreateProduct, GetProduct } from '../../../shared/models/inventory/products';
import { InventoryStore } from '../../stores/inventory/inventory-store';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  /**
   * Clase InventoryService:
   * Gestiona las rutas para el manejo del inventario
   */

  // Url del backend
  private readonly baseUrl: string = `${environment.apiUrl}/inventory`;

  // Libreria para peticiones http
  private readonly http = inject(HttpClient);
  
  /**
   * Método para obtener todos los productos registrados
   * @returns GetProduct[] -> Lista de todos los productos
   * - item_id: ID único del producto
   * - barcode: Código de barras del producto
   * - name: Nombre coloquial del producto
   * - price: Precio del producto
   * - stock: Cantidad existente del producto
   * - created_at: Fecha de registro del producto
   * - updated_at: Fecha de la última actualización del producto
   */
  fetchAll(): Observable<GetProduct[]> {
    return this.http.get<GetProduct[]>(`${this.baseUrl}`).pipe
    (
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Obtener productos')
    )
  }

  /**
   * Método para crear un nuevo producto
   * @param product CreateProduct -> Modelo para crear un producto
   * - barcode: Código de barras del producto
   * - name: Nombre coloquial del producto
   * - price: Precio del producto
   * - stock: Cantidad existente del producto
   * @returns Observable con la respuesta del backend.
   */
  createProduct(product: CreateProduct): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, product).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Crear producto')
    )
  }

  /**
   * Método para actualizar los datos del producto
   * @param product CreateProduct -> Modelo para crear un producto
   * - barcode: Código de barras del producto
   * - name: Nombre coloquial del producto
   * - price: Precio del producto
   * - stock: Cantidad existente del producto
   * @param itemId ID único del producto
   * @returns Observable con la respuesta del backend.
   */
  updateProduct(product: CreateProduct, itemId: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${itemId}`, product).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Actualizar producto')
    )
  }

  /**
   * Método para eliminar un producto
   * @param itemId ID único del producto
   * @returns Observable con la respuesta del backend.
   */
  deleteProduct(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${itemId}`).pipe(
      tap(
        response => {
          console.log(response);
        }
      ),
      handleHttpError('Eliminar producto')
    )
  }
}
