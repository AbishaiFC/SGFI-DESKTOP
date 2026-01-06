import type { HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

/**
 * Operador reutilizable para manejar errores HTTP de forma centralizada y consistente.
 * Úsalo en cualquier servicio: `.pipe(handleHttpError('login'))`
 * 
 * @param operation Nombre descriptivo de la operación
 * @returns 
 */
export function handleHttpError(operation: string) {
    /**
     * Permitimos el acceso de todas las funciones para poder capturar el error
     */
    return function <T>(source: Observable<T>): Observable<T> {
        return source.pipe(
            catchError((error: HttpErrorResponse) => {
                // Verificamos si existe detalle del error, en caso contrario enviamos un mensaje generico
                const message = error.error?.detail ?? `Error en ${operation}`;

                // Registramos el log en consola para depurar
                console.error(`[${operation}]`, error);

                // Retornamos el error
                return throwError(() => new Error(message))
            })
        )
    }
}