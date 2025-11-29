import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gray-card',
  imports: [],
  templateUrl: './gray-card.html',
  styleUrl: './gray-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class GrayCard {

}
