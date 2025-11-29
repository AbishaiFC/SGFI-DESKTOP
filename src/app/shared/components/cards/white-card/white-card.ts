import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-white-card',
  imports: [],
  templateUrl: './white-card.html',
  styleUrl: './white-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class WhiteCard {

}
