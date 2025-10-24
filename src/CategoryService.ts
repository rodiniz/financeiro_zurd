import { Injectable } from '@angular/core';
import { GenericService } from './Generic';
import { Category } from './app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService<Category> {
  constructor() {
    super('Category');
  }
}
