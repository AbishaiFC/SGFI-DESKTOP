import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { GrayCard } from "../../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../../shared/components/button/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [Title, GrayCard, Button, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User {

}
