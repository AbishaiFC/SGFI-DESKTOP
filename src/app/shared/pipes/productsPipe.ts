import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'products'
})
export class ProductsPipe implements PipeTransform {
    transform(value: number,): string {
        if (value === 1){
            return `${value} producto`;
        }

        return `${value} productos`;
    }
 }