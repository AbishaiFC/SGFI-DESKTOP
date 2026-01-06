import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Kpi } from "../../shared/components/kpi/kpi";
import { EmptyChartSales } from "./fragments/empty-chart-sales/empty-chart-sales";
import { EmptyTopProducts } from "./fragments/empty-top-products/empty-top-products";
import { Inventory } from "./fragments/inventory/inventory";
import { EmptyLowProducts } from "./fragments/empty-low-products/empty-low-products";
import { InventoryStore } from '../../core/stores/inventory/inventory-store';
import { GetProduct } from '../../shared/models/inventory/products';
import { TableLowProducts } from "./fragments/table-low-products/table-low-products";
import { ReportsStore } from '../../core/stores/reports/reports-store';
import { weeklyDates } from '../../core/utils/initial-date';
import { TopProducts } from "./fragments/top-products/top-products";
import { WeeklySales } from "./fragments/weekly-sales/weekly-sales";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [Kpi, EmptyChartSales, EmptyTopProducts, Inventory, EmptyLowProducts, TableLowProducts, TopProducts, WeeklySales, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main implements OnInit {

  // Servicio de almacenamiento de inventario
  private readonly inventoryStore = inject(InventoryStore);

  // Servicio de almacenamiento de reportes
  private readonly reportsStore = inject(ReportsStore);

  // Variable para controlar el rango de stock bajo para los productos
  readonly LOW_STOCK_TREESHOLD = signal(8);

  // Variable para obtener las ventas de la semana
  weeklySales = this.reportsStore.weeklySales;

  // Variable para obtner el top de productos
  topProducts = this.reportsStore.topProducts;

  // Computed signal para las ventas de hoy
  todaySales = computed(() => {
    const sales = this.weeklySales();
    if (!sales || sales.length === 0) {
      return { total_sales: 0, sale_count: 0, total_products: 0 };
    }

    // Obtener la fecha más reciente (último elemento del array)
    const today = sales[sales.length - 1];
    
    return {
      total_sales: today?.total_sales ?? 0,
      sale_count: today?.sale_count ?? 0,
      total_products: today?.total_products ?? 0
    };
  });

  // Computed signal para las ventas de ayer
  yesterdaySales = computed(() => {
    const sales = this.weeklySales();
    if (!sales || sales.length < 2) {
      return { total_sales: 0, sale_count: 0, total_products: 0 };
    }

    // Obtener el penúltimo elemento del array
    const yesterday = sales[sales.length - 2];
    
    return {
      total_sales: yesterday?.total_sales ?? 0,
      sale_count: yesterday?.sale_count ?? 0,
      total_products: yesterday?.total_products ?? 0
    };
  });


  // Valor total del inventario
  inventoryValue = computed<number>(() => {
    const products = this.inventoryStore.products() ?? [];
    return products.reduce(
      (total, {stock, price}) => total + stock * price,
      0
    )
  })

  // Productos con bajo stock
  lowStockProducts = computed<GetProduct[]>(() => {
    const products = this.inventoryStore.products() ?? []
    return products.filter(
      product => product.stock <= this.LOW_STOCK_TREESHOLD()
    )
  })

  ngOnInit(): void {
    const dates = weeklyDates();
    this.inventoryStore.loadInventory().subscribe();
    this.reportsStore.loadTopProducts().subscribe();
    this.reportsStore.loadWeeklySales(dates.startDate, dates.endDate).subscribe()
  }
}
