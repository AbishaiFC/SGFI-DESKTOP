import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {

}
