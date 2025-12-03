import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-sidebar',
  imports: [MatIconModule],
  templateUrl: './button-sidebar.html',
  styleUrl: './button-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSidebar {
  @Input() color: string = "primary"
  @Input({required: true}) icon: string = ""
}
