import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyTable } from "../empty-table/empty-table";
import { EmptyChart } from "../empty-chart/empty-chart";
import { ExcelFormat } from "../excel-format/excel-format";

@Component({
  selector: 'app-reports',
  imports: [EmptyTable, EmptyChart, ExcelFormat],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reports {

}
