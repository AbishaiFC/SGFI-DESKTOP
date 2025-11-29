import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table } from "../table/table";
import { Form } from "../form/form";
import { EmptyTable } from "../empty-table/empty-table";

@Component({
  selector: 'app-inventory',
  imports: [Form, EmptyTable],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventory {

}
