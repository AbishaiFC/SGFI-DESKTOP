import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from "@angular/router";
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, ReactiveFormsModule, CustomInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
  })

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
