import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../shared/components/button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { ProductForm } from '../../../shared/models/forms/inventory-forms';
import { InventoryService } from '../../../core/services/inventory/inventory-service';
import { FormStateManager } from '../../../core/utils/form-state.helper';
import { CreateProduct, GetProduct } from '../../../shared/models/inventory/products';
import { InventoryStore } from '../../../core/stores/inventory/inventory-store';
import { AlertsService } from '../../../core/services/alerts/alerts-service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [WhiteCard, TitleCard, Button, ReactiveFormsModule, CustomInput],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {

  // Servicio de inventario
  private readonly inventoryService = inject(InventoryService);

  // Servicio de almacenamiento de inventario
  private readonly inventoryStore = inject(InventoryStore);

  // Servicio de alertas
  private readonly alertsService = inject(AlertsService);

  // Estados del formulario
  readonly formState = new FormStateManager<string>();

  // Tipo de formulario Crear | Editar
  formType: 'create' | 'edit' = 'create';

  // Input para obtener el input para editar un producto existente
  @Input() set editProduct(value: GetProduct | null){
    if(!value){
      this.resetForm();
      return;
    }

    this.productForm.patchValue({
      barcode: value.barcode,
      name: value.name,
      price: value.price,
      stock: value.stock
    })

    this.idProduct = value.item_id;

    this.formType = 'edit';
  }

  idProduct = '';

  productForm = new FormGroup<ProductForm> ({
    barcode: new FormControl({value: 0, disabled: false}, {nonNullable: true, validators:[Validators.required]}),
    name: new FormControl('', {nonNullable: true, validators:[Validators.required]}),
    price: new FormControl(0, {nonNullable: true, validators:[Validators.required, Validators.min(1)]}),
    stock: new FormControl(0, {nonNullable: true, validators:[Validators.required, Validators.min(1)]}),
  })

  onSubmit(): void {
    console.log(this.productForm.value);

    if (this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return
    }

    // Mapeo explícito del formulario al modelo de dominio
    const product: CreateProduct = this.productForm.getRawValue()

    if(this.formType === 'create'){
      this.inventoryService.createProduct(product).
        pipe(switchMap(() => this.inventoryStore.loadInventory()),
        tap(() => {
          this.alertsService.success('Se ha registrado el producto exitosamente')
          this.resetForm()
        }),
        catchError((err: Error) => {
          this.alertsService.error(err.message ?? 'Error al registrar')
          this.formState.setError(err.message);
          return EMPTY;
        })
      ).subscribe()
    }else{
      this.inventoryService.updateProduct(product, this.idProduct).
        pipe(switchMap(() => this.inventoryStore.loadInventory()),
        tap(() => {
          this.alertsService.success('Se ha actualizado el producto exitosamente')
          this.resetForm()
        }),
        catchError((err: Error) => {
          
          this.alertsService.error(err.message ?? 'Error al actualizar')
          this.formState.setError(err.message);
          return EMPTY;
        })
      ).subscribe()
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  private resetForm():void {
    this.formState.reset();
    this.productForm.reset()
    this.formType = 'create';
    this.idProduct = '';
  }
}
