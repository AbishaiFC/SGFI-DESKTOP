import { Component, signal } from '@angular/core';
import { Current } from "./features/sales/current/current";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SGFI');
}
