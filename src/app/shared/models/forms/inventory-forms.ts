import { FormControl } from "@angular/forms";

export interface ProductForm {
    barcode: FormControl<number>;
    name: FormControl<string>;
    price: FormControl<number>;
    stock: FormControl<number>;
}
