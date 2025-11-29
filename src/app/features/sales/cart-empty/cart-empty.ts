import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-empty',
  imports: [],
  templateUrl: './cart-empty.html',
  styleUrl: './cart-empty.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartEmpty {

}
