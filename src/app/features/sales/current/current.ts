import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { CurrentEmpty } from "../current-empty/current-empty";
import { CartEmpty } from "../cart-empty/cart-empty";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";

@Component({
  selector: 'app-current',
  imports: [Title, GrayCard, CurrentEmpty, CartEmpty, MatIconModule, MatButtonModule, RouterModule, RedirectButton],
  templateUrl: './current.html',
  styleUrl: './current.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Current {

}
