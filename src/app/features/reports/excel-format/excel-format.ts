import { ChangeDetectionStrategy, Component, inject, input, model, output, signal } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../shared/components/button/button";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, DateRange } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../../core/services/reports/reports-service';
import { DatesFormat } from '../../../shared/models/dates/dates-model';
import { AlertsService } from '../../../core/services/alerts/alerts-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-excel-format',
  imports: [WhiteCard, TitleCard, Button, MatDatepickerModule, CommonModule],
  templateUrl: './excel-format.html',
  styleUrl: './excel-format.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()]
})
export class ExcelFormat {
  private readonly reportsService = inject(ReportsService);
  private readonly alertsService = inject(AlertsService);

  // Usamos una señal para el rango completo
  readonly selectedRange = signal<DateRange<Date>>(new DateRange<Date>(null, null));
  readonly salesLength = input.required<number>();

  // Signal para controlar el estado de carga
  readonly isDownloading = signal<boolean>(false);

  dateRange = output<DateRange<Date>>();

  // Método para manejar la lógica de selección
  onSelectedChange(date: Date | null): void {
    const currentRange = this.selectedRange();

    if (!currentRange.start || currentRange.end) {
      // Si no hay inicio, o ya había un rango completo, empezamos de nuevo
      this.selectedRange.set(new DateRange<Date>(date, null));
    } else {
      // Si ya había inicio pero no fin, cerramos el rango
      // (Ordenamos las fechas por si el usuario elige una fecha anterior al inicio)
      if (date && date < currentRange.start) {
        this.selectedRange.set(new DateRange<Date>(date, currentRange.start));
        this.dateRange.emit(this.selectedRange());
      } else {
        this.selectedRange.set(new DateRange<Date>(currentRange.start, date));
        this.dateRange.emit(this.selectedRange());
      }
    }
  }

  onDownload(): void {
    const start = this.selectedRange().start;
    const end = this.selectedRange().end;

    if (!start || !end) {
      this.alertsService.error('Por favor seleccione un rango de fechas válido');
      return;
    }

    this.isDownloading.set(true);

    const startDate = start.toISOString();
    const endDate = end.toISOString();

    this.reportsService.fetchExport(startDate, endDate).pipe(
      finalize(() => this.isDownloading.set(false))
    ).subscribe({
      next: (blob) => {
        // Descargar el archivo
        const filename = `reporte_ventas_${start.toISOString().split('T')[0]}_${end.toISOString().split('T')[0]}.xlsx`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();

        this.alertsService.success('¡El formato se ha descargado exitosamente!');


      },
      error: (err: Error) => {
        console.error(err.message);
        this.alertsService.error('No hemos podido descargar el formato, por favor intente nuevamente');
      }
    });
  }
}