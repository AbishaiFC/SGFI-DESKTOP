import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { GrayCard } from "../../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../../shared/components/button/button";
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from "../../../../shared/components/custom-input/custom-input";

@Component({
  selector: 'app-email',
  imports: [Title, GrayCard, Button, RouterModule, CustomInput, ReactiveFormsModule],
  templateUrl: './email.html',
  styleUrl: './email.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Email {
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

}
