import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
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
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<void>();

  onClick(event: Event): void {
    if (this.type !== 'submit') {
      event.preventDefault();
    }
    this.clicked.emit();
  }
}
