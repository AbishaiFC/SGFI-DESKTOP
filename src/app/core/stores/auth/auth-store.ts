import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { Account } from '../../../shared/models/auth/account';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  /**
   * Servicio para obtener los datos de mi cold observable
   * y convertirlos a hot observables con ayuda de signals
   * para mayor reactividad
   */

  // Servicio de Autenticación
  private readonly authService = inject(AuthService);

  // Signal privado para manejar el estado
  private accountSubject = new BehaviorSubject<Account | null>(null)

  // Signal público de solo lectura
  readonly account = toSignal(this.accountSubject.asObservable(), {
    initialValue: null
  })

  /**
   * Carga los datos del usuario y actualiza el signal
   */
  loadAccount(): Observable<Account> {
    return this.authService.me().pipe(
      tap(account => this.accountSubject.next(account))
    );
  }

  /**
   * Limpia el signal (útil para logout)
   */
  clearAccount(): void {
   this.accountSubject.next(null)
  }
}
