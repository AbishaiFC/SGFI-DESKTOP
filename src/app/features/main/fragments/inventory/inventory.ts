import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../../shared/components/button/button";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [WhiteCard, TitleCard, Button, CommonModule, RouterModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventory {
  @Input() value: number = 0;
}
