import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Implementar ControlValueAccessor permite que el componente:
 * - Funcione con FormControl y FormGroup
 * - Reciba valores desde el formulario padre
 * - Notifique cambios al formulario
 * - Respete estados como disabled, touched y dirty
 */
export class CustomInput implements ControlValueAccessor, OnInit {
  /**
   * Valor actual del input.
   * Este valor se sincroniza con el FormControl padre.
   */
  modelValue: string | number | null = null;

  /**
   * Valor mostrado en la ui
   * Este valor se sincroniza con modelValue pero manteniendolo en string para
   * mostrarlo en la ui de forma 'bonita'
   */
  viewValue: string = '';

  /**
   * Controla si la contraseña es visible o no.
   */
  showPassword: boolean = false;

  /**
   * Callbacks registrados por Angular Forms.
   * Se inicializan como funciones vacías para evitar null checks.
   */
  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  /**
   * Controla el estado disabled del input.
   * Este valor puede ser sobrescrito por Angular Forms
   * mediante setDisabledState().
   */
  @Input() disabled: boolean = false;
  
  /**
   * Configuración visual y funcional del input
   *
   * label        → Texto del mat-label
   * prefixIcon   → Icono antes del input
   * suffixIcon   → Icono después del input
   * typeValue    → Tipo de input HTML (text, email, number, etc.)
   * placeholder  → Texto guía para el usuario
   * errorMessage → Mensaje de error personalizado
   * isPassword   → Activa lógica especial de contraseña
   */
  @Input() label: string = "";
  @Input() prefixIcon: string = "";
  @Input() suffixIcon: string = "";
  @Input() typeValue: 'text' | 'email' | 'number' | 'password' = "text";
  @Input() placeholder: string = "";
  @Input() errorMessage: string = "";
  @Input() isPassword: boolean = false;

  // Inyectamos NgControl (Self) para acceder al FormControl padre directamente
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private cdr: ChangeDetectorRef){
      /**
       * Si el componente se usa dentro de un formulario reactivo,
       * Angular inyecta NgControl automáticamente.
       *
       * Se asigna este componente como valueAccessor manualmente
       * para garantizar compatibilidad total.
       */
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    }

  /**
   * writeValue
   * --------------------------------------------------------
   * Angular Forms llama a este método cuando el valor del
   * FormControl cambia desde fuera del componente.
   */
  writeValue(modelValue: string | number | null): void {
    this.modelValue = modelValue;
    this.viewValue = this.stringify(modelValue);
    this.cdr.markForCheck();
  }

  /**
   * registerOnChange
   * --------------------------------------------------------
   * Angular proporciona una función que debemos ejecutar
   * cada vez que el valor interno cambie.
   */
  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  /**
   * registerOnTouched
   * --------------------------------------------------------
   * Angular proporciona una función que debemos ejecutar
   * cuando el input es tocado (blur).
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * setDisabledState
   * --------------------------------------------------------
   * Angular Forms controla el estado disabled desde el
   * FormControl padre.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  /**
   * Se ejecuta en cada evento input.
   * - Actualiza el valor interno
   * - Notifica al FormControl padre
   */
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;  // ← Se obtiene lo que escribió el usuario
    this.viewValue = input.value;  // ← Actualiza el valor interno
    this.modelValue = this.parse(this.viewValue);
    
    this.onChange(this.modelValue);  // ← Notifica al formulario padre
  }

  /**
   * Se ejecuta cuando el input pierde foco.
   * Marca el control como touched.
   */
  onBlur(): void {
    this.onTouched();  // ← Notifica que el usuario tocó el campo
  }

  /**
   * Inicialización:
   * Si el input es de tipo password, forzamos el type inicial.
   */
  ngOnInit(): void {
    if (this.isPassword){
      this.typeValue = 'password';
    }
  }

  /**
   * Tipo efectivo del input.
   * Permite alternar entre 'password' y 'text'.
   */
  get effectiveType(): string {
    if (this.isPassword){
      return this.showPassword ? 'text' : 'password'
    }
    return this.typeValue;
  }


  /**
   * Icono efectivo del suffix.
   * Cambia dinámicamente según visibilidad de la contraseña.
   */
  get effectiveSuffixIcon(): string {
    if (this.isPassword) {
      return this.showPassword ? 'visibility' : 'visibility_off';
    }
    return this.suffixIcon;
  }

  /**
   * Maneja el click del icono suffix.
   * Actualmente solo aplica para password.
   */
  onSuffixClick(): void {
    if (this.isPassword) {
      this.togglePassword();
    }
  }

  private togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();  // Forzamos detección de cambios
  }

  /**
   * Indica si el control tiene errores visibles.
   * Se basa en:
   * - Estado invalid
   * - touched o dirty
   */
  get hasError(): boolean {
    return !!(this.ngControl?.invalid && (this.ngControl?.touched || this.ngControl?.dirty));
  }

  /**
   * Función Privada para mantener el valor String para la ui
   */
  private parse(viewValue: string): string | number | null {
    if (viewValue === '') {
      return null;
    }

    if (this.typeValue === 'number') {
      const parsed = Number(viewValue);
      // Number("abc") = NaN, Number("") = 0
      return isNaN(parsed) ? null : parsed;
    }

    return viewValue;
  }

  /**
   * Función Privada que evalua los datos del modelo y los parsea para mantener lógica
   * correcta en el input
   */
  private stringify(modelValue: string | number | null): string {
    if (modelValue === null || modelValue === undefined || modelValue === 0) {
      return '';
    }

    return String(modelValue);
  }

}
