import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { Router, RouterModule } from "@angular/router";
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { AuthService } from '../../../core/services/auth/auth-service';
import { RegisterForm } from '../../../shared/models/forms/auth-forms';
import { Account } from '../../../shared/models/auth/account';
import { FormStateManager } from '../../../core/utils/form-state.helper';
import { AlertsService } from '../../../core/services/alerts/alerts-service';

@Component({
  selector: 'app-register',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, ReactiveFormsModule, CustomInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  /**
   * Componente de registro
   * Este archivo gestiona la lógica detras de la UI
   * Especificamente este es el punto de entrada para el registro de un nuevo Admin
   */

  // Servicio de Autenticación
  private readonly authService = inject(AuthService);

  // Servicio de Enrutamiento
  private readonly router = inject(Router);

  // Servicio de Alertas
  private readonly alertsService = inject(AlertsService);

  // Estados del formulario
  readonly formState = new FormStateManager<string>();

  registerForm = new FormGroup<RegisterForm>({
    full_name: new FormControl<string>('', {nonNullable: true, validators:[Validators.required, Validators.minLength(4)]}), 
    email: new FormControl<string>('', {nonNullable: true, validators:[Validators.required, Validators.email]}), 
    password: new FormControl<string>('', {nonNullable: true, validators:[Validators.required, Validators.minLength(8)]}), 
  })


  onSubmit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // Mapeo explícito del formulario al modelo de dominio
    const account: Account = this.registerForm.getRawValue();

    this.formState.setLoading();

    this.authService.register(account).subscribe({
      next: () => {
        this.formState.setSuccess();
        this.alertsService.success('Tu cuenta ha sido creada correctamente. Bienvenido a SGFI')
        this.router.navigate(['/dashboard']);
      },
      error: (err:Error) => {
        this.formState.setError(err.message)
        this.alertsService.error('No pudimos completar el registro. Por favor, intenta de nuevo en unos momentos.', 'Error en Registro')
      }
    })
  }
}
