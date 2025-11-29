import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../cards/white-card/white-card";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi',
  imports: [WhiteCard, MatIconModule],
  templateUrl: './kpi.html',
  styleUrl: './kpi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kpi {

}
