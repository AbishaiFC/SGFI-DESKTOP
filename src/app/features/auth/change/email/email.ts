import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { GrayCard } from "../../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../../shared/components/button/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email',
  imports: [Title, GrayCard, Button, RouterModule],
  templateUrl: './email.html',
  styleUrl: './email.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Email {

}
