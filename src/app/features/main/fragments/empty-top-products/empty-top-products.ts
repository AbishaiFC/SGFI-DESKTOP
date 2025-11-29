import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";

@Component({
  selector: 'app-empty-top-products',
  imports: [WhiteCard, TitleCard],
  templateUrl: './empty-top-products.html',
  styleUrl: './empty-top-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyTopProducts {

}
