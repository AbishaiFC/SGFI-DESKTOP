import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-card',
  imports: [],
  templateUrl: './title-card.html',
  styleUrl: './title-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCard {
  @Input({required: true}) title: string = '';
  @Input() color: string = 'primary';
}
