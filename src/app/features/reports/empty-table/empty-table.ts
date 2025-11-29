import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";

@Component({
  selector: 'app-empty-table',
  imports: [WhiteCard],
  templateUrl: './empty-table.html',
  styleUrl: './empty-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyTable {

}
