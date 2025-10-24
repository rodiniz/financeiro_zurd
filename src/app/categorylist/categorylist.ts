import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardTableComponent, ZardTableBodyComponent, ZardTableRowComponent } from '@shared/components/table/table.component';
import { Category } from '../models/Category';
import { CategoryService } from 'src/CategoryService';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-categorylist',
  imports:  [AsyncPipe, ZardButtonComponent,ZardTableComponent,
       ZardTableBodyComponent,
       ZardTableRowComponent],
  templateUrl: './categorylist.html',
  styleUrl: './categorylist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categorylist implements OnInit {
    categorys$!:Observable<Array<Category>>;
    categoryservice=inject(CategoryService);
    ngOnInit(): void {
      this.categoryservice.get().subscribe({
            next:(resp)=>{               
              this.categorys$=resp;
            },
            error:(err)=>{
              console.log(err)
            }
          });
  }
 }
