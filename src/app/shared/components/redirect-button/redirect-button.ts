import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-redirect-button',
  imports: [MatButtonModule ,MatIconModule, RouterModule],
  templateUrl: './redirect-button.html',
  styleUrl: './redirect-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedirectButton {
  @Input({required: true}) icon: string = "";
  @Input({required: true}) position: string = "left";
}
