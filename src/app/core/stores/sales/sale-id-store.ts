import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaleIdStore {
  /**
   * Servicio de almacenamiento de los SaleId
   *  
   */
  // Llave para almacenamiento local del ID de una venta en progreso
  private readonly key: string = 'SALE_ID'

  /**
   * Método para almacenar el ID
   * @param saleId ID único de una venta en prgreso
   */
  setId(saleId: string): void{
    localStorage.setItem(this.key, saleId);
  }

  /**
   * Método para obtener el ID almacenado
   * @returns Retorna el ID almacenado en caso de este no existir retorna `null`
   */
  getId(): string | null {
    return localStorage.getItem(this.key);
  }

  /**
   * Método para eliminar el ID almacenado
   */
  clearId(): void {
    localStorage.removeItem(this.key)
  }
}
