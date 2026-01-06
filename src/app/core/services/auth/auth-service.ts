import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Account, ChangePassword, Email, LoginData, MigrateAccount } from '../../../shared/models/auth/account';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token, Tokens } from '../../../shared/models/auth/token';
import { handleHttpError } from '../../../shared/operators/http-error.operator';
import { TokenStore } from '../../stores/token/token-store';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Clase AuthService:
   * Gestiona las rutas de autenticación
   * - Me
   * - Login
   * - Register
   * - Logout
   * - Change Password
   * - Reset Password
   * - Migrate Account
   * - Refresh Token
   */

  // Url del backend
  private readonly baseUrl: string = `${environment.apiUrl}/auth`;

  // Libreria para peticiones http
  private readonly http = inject(HttpClient);

  // Servicio de almacenamiento de tokens
  private readonly tokenStore = inject(TokenStore);

  /**
   * ==================================================================
   *                            Métodos
   * ==================================================================
   */

  /**
   * Método para obtener los datos de cuenta del Usuario
   * @returns Observable con la respuesta del backend.
   */
  me(): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/me`).pipe(
      handleHttpError('Obtener usuario')
    )
  }


  /**
   * Método para el registro del Usuario
   * @param credentials Los datos necesarios para la creación de la cuenta
   * - full_name: Nombre del Usuario
   * - email: Correo electrónico del Usuario
   * - password: Contraseña del Usuario
   * @returns Observable con la respuesta del backend.
   */
  register(credentials: Account): Observable<ApiResponse<Tokens>> {
    return this.http.post<ApiResponse<Tokens>>(`${this.baseUrl}/register`,
      credentials
    ).pipe(
      tap(
        response => {
          this.tokenStore.saveTokens(response.data.access_token, response.data.refresh_token)
          console.log(response)
        }
      ),
      handleHttpError('Registro')
    )
  }

  /**
   * Método para el Inicio de Sesión
   * @param credentials Las credenciales del usuario 
   * - email: Correo electrónico del Usuario
   * - password: Contraseña del Usuario
   * @returns Observable con la respuesta del backend.
   */
  login(credentials: LoginData): Observable<ApiResponse<Tokens>> {
    return this.http.post<ApiResponse<Tokens>>(`${this.baseUrl}/login`,
      credentials
    ).pipe(
      tap(
        response => {
          this.tokenStore.saveTokens(response.data.access_token, response.data.refresh_token)
          console.log(response)
        }
      ),
      handleHttpError('Inicio de Sesión')
    )
  }

  /**
   * Método para el Cierre de Sesión
   * @param credentials Datos pedidos para realizar un cambio de contraseña
   * access_token: Token JWT para acceso
   * refresh_token: Token JWT para la creación de un nuevo token de acceso
   * @returns Observable con la respuesta del backend.
   */
  logout(credentials: Tokens): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`,
      credentials
    ).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Cierre de Sesión')
    )
  }

  /**
   * Método para el cambio de contraseña
   * @param credentials Datos pedidos para realizar un cambio de contraseña
   * new_password: Nueva contraseña del Usuario
   * current_password: Contraseña actual del Usuario
   * @returns Observable con la respuesta del backend.
   */
  changePassword(credentials: ChangePassword): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/change-password`, 
      credentials
    ).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Cambio de contraseña')
    )
  }

/**
 * Método para la solicitud de Cambio de Contraseña en caso de olvido
 * @param credentials Credencial de autenticidad
 * - email: Correo electrónico del Usuario
 * @returns Observable con la respuesta del backend.
 */
  resetPasswordReq(credentials: Email): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password/request`,
      credentials
    ).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Nueva contraseña')
    )
  }

  /**
   * Método para el cambio de correo
   * @param credentials Datos de autenticidad del usuario
   * - new_email: Nuevo Correo electrónico del Usuario
   * - password: Contraseña del Usuario
   * @returns Observable con la respuesta del backend.
   */
  migrateAccount(credentials: MigrateAccount): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/migrate-account`,
      credentials
    ).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Migrar Cuenta')
    )
  }

  /**
   * Método para la solicitud de nuevo token de autenticidad
   * @param credentials 
   * - token: Token JWT para la creación de un nuevo token de acceso
   * @returns Observable con la respuesta del backend.
   */
  refreshToken(credentials: Token): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.baseUrl}/refresh`,
      credentials
    ).pipe(
      tap(
        response => {
          console.log(response)
        }
      ),
      handleHttpError('Refrescar Token')
    )
  }
}
