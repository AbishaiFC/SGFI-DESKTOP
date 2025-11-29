import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../../shared/components/button/button";

@Component({
  selector: 'app-inventory',
  imports: [WhiteCard, TitleCard, Button],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventory {

}
