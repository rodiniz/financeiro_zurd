import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardTableComponent, ZardTableBodyComponent, ZardTableRowComponent } from '@shared/components/table/table.component';
import { Category } from '../models/Category';
import { CategoryService } from 'src/CategoryService';
import { Router } from '@angular/router';
import { ZardDialogService } from '@shared/components/dialog/dialog.service';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-categorylist',
  imports: [ZardButtonComponent, ZardTableComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent],
  templateUrl: './categorylist.html',
  styleUrl: './categorylist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categorylist implements OnInit {
  dialogService = inject(ZardDialogService);
  categorys = signal<Category[]>([]);
  categoryservice = inject(CategoryService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.categoryservice.getPaged('name',0).subscribe({
        next:(resp)=>{         
          this.categorys.set(resp.items);
        },
        error:(err)=>{
          
          console.log(err);
        }
    });
  }

  redirectoToCreate() {
    this.router.navigate(['dashboard/category'])
  }
  redirectToId(id: number) {
    this.router.navigate(['dashboard/category', id])
  }
  deleteCategory(id: number) {
    this.dialogService.create({
      zTitle: 'Expense Tracker',
      zDescription: ``,
      zContent: 'Are you sure you want to delete?',
      zOkText: 'Yes',
      zOnOk: _instance => {
        console.log(id);
        this.categoryservice.delete(id).subscribe({
          next: (_resp) => {          
            this.loadData();
          },
          error: (_err) => {          
            toast.error('Expense tracker', {
              description: 'Error deleting category',
            });

          }
        });
      },
      zWidth: '425px'
    });
  }
}
