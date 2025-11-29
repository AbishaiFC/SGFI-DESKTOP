import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";

@Component({
  selector: 'app-empty-low-products',
  imports: [WhiteCard, TitleCard],
  templateUrl: './empty-low-products.html',
  styleUrl: './empty-low-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyLowProducts {

}
