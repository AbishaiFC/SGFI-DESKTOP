import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, CustomInput, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  onSubmit(): void {
    console.log(this.forgotForm.value);
  }

}
