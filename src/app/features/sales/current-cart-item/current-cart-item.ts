import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductsSale } from '../../../shared/models/sales/sale';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-current-cart-item',
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './current-cart-item.html',
  styleUrl: './current-cart-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentCartItem {
  product = input.required<ProductsSale>()

  increment = output<{ itemId:string; quantity: number}>();
  decrement = output<{ itemId:string; quantity: number}>();
  delete = output<{ itemId:string }>();

  handleIncrement(): void {
    this.increment.emit({
      itemId: this.product().item_id,
      quantity: this.product().quantity
    })
  }

  handleDecrement(): void {
    this.decrement.emit({
      itemId: this.product().item_id,
      quantity: this.product().quantity
    })
  }

  handleDelete(): void {
    this.delete.emit({
      itemId: this.product().item_id
    })
  }
}
