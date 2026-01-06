import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth-service';
import { inject } from '@angular/core';
import { TokenStore } from '../../stores/token/token-store';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * 
   * Auth Interceptor
   * ----------------
   * Este interceptor HTTP se encarga de gestionar automáticamente la autenticación basada en JWT para todas las peticiones salientes de la aplicación Angular, garantizando que:
   * Las rutas protegidas incluyan un access_token válido.
   * Las rutas públicas se excluyan explícitamente del flujo de autenticación.
   * Los errores 401 Unauthorized intenten resolverse mediante un refresh automático del token.
   * La sesión se cierre de forma segura cuando los tokens sean inválidos o el refresh falle.
   * 
   */

  // Servicio de autenticación
  const authService = inject(AuthService);

  // Servicio de almacenamiento de Tokens
  const tokenStore = inject(TokenStore);

  // Rutas que no necesitan token
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password/request', '/auth/refresh'];

  // Verificar si es ruta pública
  const isPublicRoute = publicRoutes.some(route => {
    // Comparación más precisa
    const url = new URL(req.url, window.location.origin);
    return url.pathname.includes(route);
  });

  // Si es pública, enviar sin modificar
  if (isPublicRoute){
    return next(req)
  }

  // Añadir access token a la petición
  const accessToken = tokenStore.getAccessToken();

  // Validar que el access token tenga formato JWT básico
  const isValidToken = accessToken && typeof accessToken === 'string' && accessToken.split('.').length === 3;

  if(!isValidToken){
    console.warn('Access token inválido o mal formado');
    tokenStore.logout();
    return throwError(() => new Error('Token de acceso inválido'));
  }

  // Clonamos la petición para añadir el token JWT
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  // Reintentamos la petición
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si es 401, intentar refrescar el token
      if(error.status !== 401) {
        return throwError(() => error);
      }
        
      // Obtener refresh token
      const refreshToken = tokenStore.getRefreshToken();
        

      // Validar formato del refresh token
      const isValidRefreshToken = refreshToken && typeof refreshToken === 'string' && refreshToken.split('.').length === 3;

      // Si no hay refresh token, redirigir a login
        if (!isValidRefreshToken) {
          console.error('Refresh token inválido o mal formado:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null');
          tokenStore.logout()
          return throwError(() => error)
        }

        // Intentar refrescar el token
        return authService.refreshToken({token: refreshToken ?? ''}).pipe(
          switchMap((response) => {
            // Guardar nuevosgit tokens
            tokenStore.saveTokens(response.access_token, response.refresh_token);

            // Reintentar la petición original con el nuevo token
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.access_token}`
              }
            });

            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            // Solo intentar logout en backend si tenemos tokens
            const currentRefreshToken = tokenStore.getRefreshToken();
            
            // Limpiar tokens localmente
            tokenStore.logout();
            
            // Solo intentar logout en backend si tenemos tokens
            if (currentRefreshToken && accessToken) {
              authService.logout({
                access_token: accessToken, 
                refresh_token: currentRefreshToken
              }).subscribe();
            }
            
            return throwError(() => refreshError);
          })
        );
    })
  );
};
