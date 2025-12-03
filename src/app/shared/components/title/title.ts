import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-title',
  imports: [MatIconModule],
  templateUrl: './title.html',
  styleUrl: './title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Title {
  @Input() title: string = "";
  @Input() color: string = "primary";
  @Input({required: true}) icon: boolean = false;
}
