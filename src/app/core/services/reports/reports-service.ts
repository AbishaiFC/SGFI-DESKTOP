import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { handleHttpError } from '../../../shared/operators/http-error.operator';
import { ReportsTopProducts, ReportsWeeklySales } from '../../../shared/models/reports/reports';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  /**
   * Clase ReportsService
   * Gestiona las rutas para la obtención de reportes
   */

  private readonly baseUrl: string = `${environment.apiUrl}/reports`;

  private readonly http = inject(HttpClient);

  /**
   * Método para obtener las ventas agrupadas por día
   * @param start_date Fecha del rango inicial de búsqueda para ventas confirmadas.
   * @param end_date Fecha del rango final de búsqueda para ventas confirmadas.
   * @returns Observable con la respuesta del backend.
   */
  fetchWeeklySales(start_date: string, end_date: string): Observable<ReportsWeeklySales[]>{
    return this.http.get<ReportsWeeklySales[]>(`${this.baseUrl}/weekly-sales?start_date=${start_date}&end_date=${end_date}`)
    .pipe(
      tap((response) => console.log(response)),
      handleHttpError('Obtener resumen de ventas semanales')
    )
  }


  /**
   * Método para obtener el anking de los products más vendidos
   * @returns Obserable con la respuesta del backend
   */
  fetchTopProducts(): Observable<ReportsTopProducts[]>{
    return this.http.get<ReportsTopProducts[]>(`${this.baseUrl}/top-products`).pipe(
      tap(
        (response) => console.log(response)
      ),
      handleHttpError('Obtener productos más vendidos')
    )
  }


  /**
 * Método para obtener un archivo descargable en formato Excel
 */
fetchExport(start_date: string, end_date: string): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/export`, {
    params: { start_date, end_date },
    responseType: 'blob'
  }).pipe(
    handleHttpError('Obtener archivo Excel')
  );
}

  /**
   * Método auxiliar para descargar el blob como archivo
   */
  private downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
}
