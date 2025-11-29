import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [Title, GrayCard, Button, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {

}
