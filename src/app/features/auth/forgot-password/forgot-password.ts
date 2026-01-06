import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { Router, RouterModule } from '@angular/router';
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordForm } from '../../../shared/models/forms/auth-forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormStateManager } from '../../../core/utils/form-state.helper';
import { Email } from '../../../shared/models/auth/account';

@Component({
  selector: 'app-forgot-password',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, CustomInput, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  /**
   * Componente de olvide mi contraseña
   * Este archivo gestiona la lógica detras de la UI
   * En este componente se incia el proceso para resetear la contraseña en caso de olvido
   */

  // Servicio de Autenticación
  private readonly authService = inject(AuthService);

  // Servicio de Enrutamiento
  private readonly router = inject(Router)

  // Estados del formulario
  readonly formState = new FormStateManager<string>();

  forgotForm = new FormGroup<ForgotPasswordForm>({
    email: new FormControl('', {nonNullable: true, validators:[Validators.required, Validators.email]})
  })

  onSubmit(): void {
    console.log(this.forgotForm.value);

    if (this.forgotForm.invalid){
      this.forgotForm.markAllAsTouched();
      return;
    }

    // Mapeo explícito del formulario al modelo de dominio
    const email: Email = this.forgotForm.getRawValue();

    this.formState.setLoading();

    this.authService.resetPasswordReq(email).subscribe({
      next: () => this.formState.setSuccess(),
      error: (err:Error) => this.formState.setError(err.message)
    })

  }
}
