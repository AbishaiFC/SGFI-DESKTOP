import { inject, Injectable } from '@angular/core';
import { ReportsService } from '../../services/reports/reports-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ReportsTopProducts, ReportsWeeklySales } from '../../../shared/models/reports/reports';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ReportsStore {
  /**
   * Clase ReportsStore
   * Este es un servicio que almacena localmente los datos en signals para mayor reactividad
   */

  // Servicio de Reportes
  private readonly reportsService = inject(ReportsService);

  // Signal privado para manejar el estado de Ventas realizadas
  private weeklySalesSubject = new BehaviorSubject<ReportsWeeklySales[] | null>(null);

  // Signal público de solo lectura
  readonly weeklySales = toSignal(this.weeklySalesSubject.asObservable(), {
    initialValue: null
  })
  

  /**
   * Método para obtener los datos de ventas semanales.
   * @param start_date Fecha de inicio del rango de ventas confirmadas
   * @param end_date Fecha de fin del rango de ventas confirmadas
   * @returns 
   */
  loadWeeklySales(start_date: string, end_date: string): Observable<ReportsWeeklySales[]> {
    return this.reportsService.fetchWeeklySales(start_date,end_date).pipe(
      tap(sales => this.weeklySalesSubject.next(sales))
    )
  }

  // Signal privado para mnejar el estado de Top de Productos
  private topProductsSubject = new BehaviorSubject<ReportsTopProducts[] | null>(null);

  // Signal púbico de solo lectura
  readonly topProducts = toSignal(this.topProductsSubject.asObservable(), {
    initialValue: null
  })

  /**
   * Método para obtener los datos de top de productos.
   * @returns 
   */
  loadTopProducts(): Observable<ReportsTopProducts[]>{
    return this.reportsService.fetchTopProducts().pipe(
      tap(products => this.topProductsSubject.next(products))
    )
  }
}
