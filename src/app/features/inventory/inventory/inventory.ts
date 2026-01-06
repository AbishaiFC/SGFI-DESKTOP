import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Table } from "../table/table";
import { Form } from "../form/form";
import { EmptyTable } from "../empty-table/empty-table";
import { InventoryStore } from '../../../core/stores/inventory/inventory-store';
import { GetProduct } from '../../../shared/models/inventory/products';

@Component({
  selector: 'app-inventory',
  imports: [Form, EmptyTable, Table],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventory implements OnInit {
  // Servicio de almacenamiento de datos de Inventario
  readonly inventoryStore = inject(InventoryStore);

  // Variable para almacenar los datos emitidios por el hijo
  editProduct!: GetProduct;

  ngOnInit(): void {
    this.inventoryStore.loadInventory().subscribe()
  }

  onEditProduct(product: GetProduct): void {
    this.editProduct = product;
    console.log(`Producto a editar: ${product}`)
  }
}
