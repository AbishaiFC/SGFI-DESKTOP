import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-current-empty',
  imports: [],
  templateUrl: './current-empty.html',
  styleUrl: './current-empty.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentEmpty {
  @Input() detail: string = '';
  @Input() src: string = '';
}
