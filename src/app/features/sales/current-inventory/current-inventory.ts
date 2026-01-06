import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GetProduct } from '../../../shared/models/inventory/products';
import { MatGridListModule } from '@angular/material/grid-list';
import { CurrentInventoryItem } from "../current-inventory-item/current-inventory-item";
import { CommonModule } from '@angular/common';
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrentEmpty } from "../current-empty/current-empty";
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-current-inventory',
  imports: [MatGridListModule, CurrentInventoryItem, CommonModule, CustomInput, ReactiveFormsModule, CurrentEmpty, MatButtonToggleModule],
  templateUrl: './current-inventory.html',
  styleUrl: './current-inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentInventory implements OnInit, OnChanges {

  // Variable que recibira los datos del padre
  @Input() products: GetProduct[] = [];

  // FormControl para el input de búsqueda
  searchControl = new FormControl<string>('', {nonNullable: true});

  // Variable que almacenará los productos filtrados (<= 0, no en término de búsueda, etc.)
  filteredProducts: GetProduct[] = [];

  ngOnInit(): void {
    // Filtro para evitar mostrar productos sin stock
    this.filteredProducts = this.products

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']){
      this.applyFilter(this.searchControl.value);
    }
  }

  private applyFilter(search: string): void {
    const term = search;

    // Caso explícito: input vacío
    if (!term) {
      this.filteredProducts = this.products.filter(
        product => product.stock > 0
      );
      return;
    }
  
    // Comparamos ambos en LowerCase para evitar que search sea null y este método no se pueda aplicar
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) &&
      product.stock > 0
    )
  }
}
