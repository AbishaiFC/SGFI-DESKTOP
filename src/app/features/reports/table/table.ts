import { AfterViewInit, ChangeDetectionStrategy, Component, Input, input, ViewChild } from '@angular/core';
import { GetSale } from '../../../shared/models/sales/sale';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatListModule, MatDividerModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements AfterViewInit {
 @Input() set sales(value: GetSale[]){
  const data = value ?? [];
  this.dataSource.data = data;

  if (this.paginator){
    this.paginator.length = data.length
  }
 }

 displayedColumns: string[] = ['products', 'timestamp'];

 dataSource = new MatTableDataSource<GetSale>([]);

 @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

 ngAfterViewInit(): void {
   queueMicrotask(() => {
    this.dataSource.paginator = this.paginator;
   })
 }
}
