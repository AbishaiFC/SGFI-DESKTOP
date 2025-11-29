import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";

@Component({
  selector: 'app-empty-chart-sales',
  imports: [WhiteCard, TitleCard],
  templateUrl: './empty-chart-sales.html',
  styleUrl: './empty-chart-sales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyChartSales {

}
