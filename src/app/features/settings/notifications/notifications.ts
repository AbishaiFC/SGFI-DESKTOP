import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { Title } from "../../../shared/components/title/title";

@Component({
  selector: 'app-notifications',
  imports: [WhiteCard, Title],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notifications {

}
