import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Account } from "../account/account";
import { Notifications } from "../notifications/notifications";
import { EmptyNotifications } from "../empty-notifications/empty-notifications";

@Component({
  selector: 'app-settings',
  imports: [Account, EmptyNotifications],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {

}
