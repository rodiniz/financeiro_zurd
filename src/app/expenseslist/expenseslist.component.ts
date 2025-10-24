import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardTableBodyComponent, ZardTableComponent, ZardTableRowComponent } from '@shared/components/table/table.component';
import { Expense } from '../models/Expense';

@Component({
  selector: 'app-expenseslist',
  imports: 
  [ZardButtonComponent,ZardTableComponent,
     ZardTableBodyComponent,
     ZardTableRowComponent],
  templateUrl: './expenseslist.component.html',
  styleUrl: './expenseslist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseslistComponent { 
  expenses : Array<Expense>=[];

}
