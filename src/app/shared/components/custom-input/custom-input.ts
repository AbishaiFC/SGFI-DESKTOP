import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInput),
    multi: true
  }]
})
export class CustomInput implements ControlValueAccessor {
  // Variables para almacenar el valor y estado actual del input
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  // Propiedad para controlar el estado deshabilitado
  @Input() disabled: boolean = false;
  
  /**
   *  Propiedades personalizables
   *  Label: Titulo del input
   *  PrefixIcon: Prefijo de icono del input
   *  SubffixIcon: Sufijo de icono del input
   *  TypeValue: Tipo de input (Email, Password, Text, Number, etc.)
   *  Placeholder: Texto amigable de que debe ingresar el usuario
   *  ErrorMessage: Mensaje de error amigable para que el usuario lo comprenda
   *  ReadOnly: El usuario solo puede ver el valor, pero no copiar
   * 
   */
  @Input() label: string = "";
  @Input() prefixIcon: string = "";
  @Input() suffixIcon: string = "";
  @Input() typeValue: string = "";
  @Input() placeholder: string = "";
  @Input() errorMessage: string = "";


  constructor(private cdr: ChangeDetectorRef){}

  /**
   * Métodos
   */
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInputChange(event: any): void {
    const newValue = event.target.value;  // ← Obtienes lo que escribió el usuario
    this.value = newValue;  // ← Actualizas tu valor interno
    
    if (this.onChange) {  // ← Si existe la función onChange
      this.onChange(newValue);  // ← Notificas al formulario padre
    }
  }

  onBlur(): void {
    if (this.onTouched) {  // ← Si existe la función onTouched
      this.onTouched();  // ← Notificas que el usuario tocó el campo
    }
  }
}
