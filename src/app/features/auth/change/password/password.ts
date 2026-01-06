import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { GrayCard } from "../../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'app-password',
  imports: [Title, GrayCard, Button, RouterModule, ReactiveFormsModule, CustomInput],
  templateUrl: './password.html',
  styleUrl: './password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Password {
  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(6)])
  })

}
