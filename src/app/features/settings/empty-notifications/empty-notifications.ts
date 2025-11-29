import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { Title } from "../../../shared/components/title/title";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";

@Component({
  selector: 'app-empty-notifications',
  imports: [WhiteCard, TitleCard],
  templateUrl: './empty-notifications.html',
  styleUrl: './empty-notifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotifications {

}
