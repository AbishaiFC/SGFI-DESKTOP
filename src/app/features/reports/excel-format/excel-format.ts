import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../shared/components/button/button";

@Component({
  selector: 'app-excel-format',
  imports: [WhiteCard, TitleCard, Button],
  templateUrl: './excel-format.html',
  styleUrl: './excel-format.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelFormat {

}
