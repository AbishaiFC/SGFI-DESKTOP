import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Kpi } from "../../shared/components/kpi/kpi";
import { EmptyChartSales } from "./fragments/empty-chart-sales/empty-chart-sales";
import { EmptyTopProducts } from "./fragments/empty-top-products/empty-top-products";
import { Inventory } from "./fragments/inventory/inventory";
import { EmptyLowProducts } from "./fragments/empty-low-products/empty-low-products";

@Component({
  selector: 'app-main',
  imports: [Kpi, EmptyChartSales, EmptyTopProducts, Inventory, EmptyLowProducts],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {

}
