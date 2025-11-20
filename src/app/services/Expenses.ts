import { Injectable } from '@angular/core';
import { GenericService } from 'src/Generic';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends GenericService<Expense> {
   constructor() {
    super('Expense');
  }

}
