import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { GetProduct } from '../../../shared/models/inventory/products';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../../shared/components/notifications/dialog/dialog';
import { InventoryService } from '../../../core/services/inventory/inventory-service';
import { InventoryStore } from '../../../core/stores/inventory/inventory-store';
import { AlertsService } from '../../../core/services/alerts/alerts-service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements AfterViewInit{
  /**
   * Componente de tabla de Productos de Inventario
   */
  // Servicio de inventario
  private readonly inventoryService = inject(InventoryService);

  // Servicio de almacenamiento de Inventario
  private readonly inventoryStore = inject(InventoryStore);

  // Servicio de alertas
  private readonly alertsService = inject(AlertsService);

  // Servicio para el modal
  readonly dialog = inject(MatDialog);

  // Input para obtener el Array de Productos 
  @Input() set products(value: GetProduct[]){
    const data = value ?? [];
    this.dataSource.data = data;

    if (this.paginator) {
      this.paginator.length = data.length;
    }
  };

  // Variable de almacenamiento del producto emitido para editar
  @Output() editProduct = new EventEmitter<GetProduct>();

  // Variable para controlar el rango de stock bajo para los productos
  readonly LOW_STOCK_TREESHOLD: number = 8;

  // Variable para almacenar las columnas que se mostraran en la tabla
  displayedColumns: string[] = ['barcode', 'name', 'price', 'stock', 'actions'];

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

  // Función para verificar si la celda tiene un valor inferior
  isLowStock(stock: number): boolean {
    return stock <= this.LOW_STOCK_TREESHOLD;
  }

  // Función para enviar los datos al padre
  onEdit(element: GetProduct):void {
    this.editProduct.emit(element);
  }

  onDelete(element: GetProduct):void{
    const dialogRef = this.dialog.open(Dialog, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado: ${result}`)
      if(result === true){
        this.inventoryService.deleteProduct(element.item_id).
        pipe(switchMap(() => this.inventoryStore.loadInventory()),
        tap(() => {
          this.alertsService.success('Producto eliminado con éxito')
        }),
        catchError((err: Error) => {
          console.error(err)
          this.alertsService.error(err.message ?? 'Se ha producido un error al intentar eliminar el producto')
          return EMPTY;
        })
       ).subscribe()
      }
    })
  }
}

