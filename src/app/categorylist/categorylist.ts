import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardTableComponent, ZardTableBodyComponent, ZardTableRowComponent } from '@shared/components/table/table.component';
import { Category } from '../models/Category';
import { CategoryService } from 'src/CategoryService';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorylist',
  imports: [AsyncPipe, ZardButtonComponent, ZardTableComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent],
  templateUrl: './categorylist.html',
  styleUrl: './categorylist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categorylist implements OnInit {

  categorys$!: Observable<Array<Category>>;
  categoryservice = inject(CategoryService);
  router=inject(Router);
  ngOnInit(): void {
    this.categorys$= this.categoryservice.get();
  }

  redirectoToCreate() {
   this.router.navigate(['dashboard/category'])
  }
}
