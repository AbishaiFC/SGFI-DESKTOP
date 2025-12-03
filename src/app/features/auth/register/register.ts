import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { RouterModule } from "@angular/router";
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'app-register',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, ReactiveFormsModule, CustomInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
    username: new FormControl('', [Validators.required, Validators.minLength(4)]), 
  })

  onSubmit(): void {
    console.log(this.registerForm.value);
  }
}
