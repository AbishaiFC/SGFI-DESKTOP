import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { GrayCard } from "../../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'app-user',
  imports: [Title, GrayCard, Button, RouterModule, ReactiveFormsModule, CustomInput],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User {
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  })
}
