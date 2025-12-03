import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() color: string = "primary";
  @Input({required: true}) icon: string = "";
  @Input({required: true}) title: string = "";

}
