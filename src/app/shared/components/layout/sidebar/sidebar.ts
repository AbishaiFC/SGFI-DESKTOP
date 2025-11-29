import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonSidebar } from "../button-sidebar/button-sidebar";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, ButtonSidebar, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {

}
