import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from '@angular/material/snack-bar';
import { AlertModel } from '../../../models/alerts/alert-model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-snackbar',
  imports: [MatSnackBarModule, MatIconModule, CommonModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Snackbar {
  constructor(
    public snackbarRef: MatSnackBarRef<Snackbar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: AlertModel
  ){}
}
