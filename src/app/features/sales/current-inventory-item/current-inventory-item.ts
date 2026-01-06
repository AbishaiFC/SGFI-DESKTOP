import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { GetProduct } from '../../../shared/models/inventory/products';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SalesService } from '../../../core/services/sales/sales-service';
import { AlertsService } from '../../../core/services/alerts/alerts-service';

@Component({
  selector: 'app-current-inventory-item',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './current-inventory-item.html',
  styleUrl: './current-inventory-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentInventoryItem {
  @Input() product!: GetProduct;
  
  // Servicio de Ventas
  private readonly salesService = inject(SalesService);

  // Servicio de Alertas
  private readonly alertsService = inject(AlertsService);

  readBarcode(barcode: number): void{
    this.salesService.barcodeItemSale(barcode).subscribe({
      error: (err: Error) => {
        console.error(err.message);
        this.alertsService.error('No se ha podido añadir el producto a una venta, intenta de nuevo')
        
      }
    })
  }

  
}
