import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EmptyTable } from "../empty-table/empty-table";
import { EmptyChart } from "../empty-chart/empty-chart";
import { ExcelFormat } from "../excel-format/excel-format";
import { ReportsStore } from '../../../core/stores/reports/reports-store';
import { SalesStore } from '../../../core/stores/sales/sales-store';
import { Table } from "../table/table";
import { CommonModule } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { monthlyDates } from '../../../core/utils/initial-date';
import { Chart } from "../chart/chart";
import { DatesFormat } from '../../../shared/models/dates/dates-model';

@Component({
  selector: 'app-reports',
  imports: [EmptyTable, EmptyChart, ExcelFormat, Table, CommonModule, Chart],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reports implements OnInit {
  private readonly reportsStore = inject(ReportsStore);
  private readonly salesStore = inject(SalesStore);

  sales = this.salesStore.sales;

  reportsSales = this.reportsStore.weeklySales;

  ngOnInit(): void {
    const dates = monthlyDates()

    this.salesStore.loadSales().subscribe();
    this.reportsStore.loadWeeklySales(dates.startDate, dates.endDate).subscribe();
    
  }
  
  onSelectedDates(dateRange: DateRange<Date>):void{
    this.reportsStore.loadWeeklySales(dateRange.start!.toISOString(), dateRange.end!.toISOString()).subscribe();
  }
}
