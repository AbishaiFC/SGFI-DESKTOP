import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidebar } from "../../shared/components/layout/sidebar/sidebar";
import { Header } from "../../shared/components/layout/header/header";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, Sidebar, Header, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {

}
