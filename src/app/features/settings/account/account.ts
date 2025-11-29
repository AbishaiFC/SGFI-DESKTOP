import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [WhiteCard, MatIconModule, MatIconButton, Button, RouterModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account {

}
