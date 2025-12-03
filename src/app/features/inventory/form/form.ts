import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";
import { Button } from "../../../shared/components/button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'app-form',
  imports: [WhiteCard, TitleCard, Button, ReactiveFormsModule, CustomInput],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  productForm: FormGroup = new FormGroup ({
    barcode: new FormControl({value: null, disabled: true}, [Validators.required],),
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    stock: new FormControl(null, [Validators.required]),
  })

  onSubmit(): void {
    console.log(this.productForm.value)
  }
}
