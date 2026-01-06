import { ChangeDetectionStrategy, Component, inject, Input, ViewChild } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { GetProduct } from '../../../../shared/models/inventory/products';

@Component({
  selector: 'app-table-low-products',
  imports: [WhiteCard, TitleCard, MatTableModule, MatPaginatorModule, CommonModule, MatSortModule],
  templateUrl: './table-low-products.html',
  styleUrl: './table-low-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLowProducts {
  /**
    * Componente de tabla de Productos de Inventario con Stock bajo
    */  
  
  // Input para obtener el Array de Productos 
  @Input() set products(value: GetProduct[]){
    const data = value ?? [];
    this.dataSource.data = data;

    if (this.paginator) {
      this.paginator.length = data.length;
    }
  };
  
  // Variable para almacenar las columnas que se mostraran en la tabla
  displayedColumns: string[] = ['barcode', 'name', 'price', 'stock'];

  // Variable para obtener los datos de productos y mostrarlos en la tabla
  dataSource = new MatTableDataSource<GetProduct>([]);

  // Definición de la función de ordenamiento
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Definición de la función de paginación
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'price':
          return item.price;
        case 'stock':
          return item.stock;
        case 'name':
          return item.name.toLowerCase();
        default:
          return (item as any)[property];
      }
    };
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
