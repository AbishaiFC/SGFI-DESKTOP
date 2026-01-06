import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Title } from "../../../shared/components/title/title";
import { GrayCard } from "../../../shared/components/cards/gray-card/gray-card";
import { Button } from "../../../shared/components/button/button";
import { Router, RouterModule } from "@angular/router";
import { RedirectButton } from "../../../shared/components/redirect-button/redirect-button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormStateManager } from '../../../core/utils/form-state.helper';
import { LoginForm } from '../../../shared/models/forms/auth-forms';
import { LoginData } from '../../../shared/models/auth/account';
import { AlertsService } from '../../../core/services/alerts/alerts-service';

@Component({
  selector: 'app-login',
  imports: [Title, GrayCard, Button, RouterModule, RedirectButton, ReactiveFormsModule, CustomInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  /**
   * Componente de inicio de sesión
   * Este archivo gestiona la lógica detras de la UI
   * Especificamente este es el punto de entrada para el acceso de la vista Admin
   */

  // Servicio de Autenticación
  private readonly authService = inject(AuthService);

  // Servicio de Enrutamiento
  private readonly router = inject(Router);

  // Servicio de alertas
  private readonly alertsService = inject(AlertsService);

  // Estados del formulario
  readonly formState = new FormStateManager<string>();

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl<string>('', {nonNullable: true,validators:[Validators.required, Validators.email]}), 
    password: new FormControl<string>('', {nonNullable: true, validators:[Validators.required, Validators.minLength(8)]}), 
  })

  onSubmit(): void {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    // Mapeo explícito del formulario al modelo de dominio
    const login: LoginData = this.loginForm.getRawValue();

    this.formState.setLoading();

    this.authService.login(login).subscribe({
      next: () => {
        this.formState.setSuccess();
        this.alertsService.success('Inicio de sesión exitoso. ¡Nos alegra volverte a ver!');
        this.router.navigate(['/dashboard']);
      },
      error: (err:Error) => {
        console.error(err.name);
        this.formState.setError(err.message);
        this.alertsService.error('No pudimos completar el inicio de sesión. Por favor, intenta de nuevo en unos momentos.', 'Error en Inicio de Sesión');
      }
    })
  }
}
