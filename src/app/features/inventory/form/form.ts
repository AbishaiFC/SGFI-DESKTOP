import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../shared/components/button/button";

@Component({
  selector: 'app-form',
  imports: [WhiteCard, TitleCard, Button],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {

}
