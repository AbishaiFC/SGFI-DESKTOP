import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../../shared/components/notifications/snackbar/snackbar';
import { AlertModel, AlertType } from '../../../shared/models/alerts/alert-model';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  // Servicio para el snackbar
  private _snackBar = inject(MatSnackBar);

  // Función pública para el envío de alertas de éxito
  success(detail: string, title: string = 'Notificación'){
    this.alert(title, detail, AlertType.SUCCESS);
  }

  // Función pública para el envío de alertas de error
  error(detail: string, title: string = 'Error'){
    this.alert(title, detail, AlertType.ERROR);
  }

  // Función privada reutilizable para el envío de alertas
  private alert(title: string, detail: string, type: AlertType, durationInSeconds: number = 5){
    const dataAlert: AlertModel = {
      title: title,
      detail: detail,
      type: type
    }

    this._snackBar.openFromComponent(Snackbar, {
      duration: durationInSeconds * 1000,
      data: dataAlert,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [type]
    })
  }
}
