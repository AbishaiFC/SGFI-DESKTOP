import { ProductsSale } from "../sales/sale";

export interface ReportsWeeklySales {
    products: ProductsSale[];
    total_sales: number;
    sale_count: number;
    total_products: number;
    date: string;
}

export interface ReportsTopProducts {
    name: string;
    quantity_sold: number;
    price: number;
}