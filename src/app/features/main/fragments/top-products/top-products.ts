import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReportsTopProducts } from '../../../../shared/models/reports/reports';
import { MatIcon } from '@angular/material/icon';
import { WhiteCard } from '../../../../shared/components/cards/white-card/white-card';
import { TitleCard } from '../../../../shared/components/cards/title-card/title-card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-products',
  imports: [MatIcon, WhiteCard, TitleCard, MatChipsModule, CommonModule],
  templateUrl: './top-products.html',
  styleUrl: './top-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopProducts {
  products = input.required<ReportsTopProducts[]>();

}
