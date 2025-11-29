import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [Title, GrayCard, Button, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {

}
