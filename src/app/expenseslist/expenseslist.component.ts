import { ChangeDetectionStrategy, Component, inject, OnInit ,signal} from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardTableBodyComponent, ZardTableComponent, ZardTableRowComponent } from '@shared/components/table/table.component';
import { Expense } from '../models/Expense';
import { ExpensesService } from '../services/Expenses';
import { Router } from '@angular/router';
import { ZardDialogService } from '@shared/components/dialog/dialog.service';
import { toast } from 'ngx-sonner';


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
export class ExpenseslistComponent implements OnInit { 
   expenses = signal<Expense[]>([]);
   expensesService = inject(ExpensesService);
   router = inject(Router);
   dialogService = inject(ZardDialogService);
   ngOnInit(): void {
      this.loadData();
    }
  
    loadData(){
      this.expensesService.getPaged('name',0).subscribe({
          next:(resp)=>{         
            this.expenses.set(resp.items);
          },
          error:(err)=>{
            
            console.log(err);
          }
      });
    }
  
    redirectoToCreate() {
      this.router.navigate(['dashboard/expense'])
    }
    redirectToId(id: number) {
      this.router.navigate(['dashboard/expense', id])
    }
    deleteCategory(id: number) {
      this.dialogService.create({
        zTitle: 'Expense Tracker',
        zDescription: ``,
        zContent: 'Are you sure you want to delete?',
        zOkText: 'Yes',
        zOnOk: _instance => {
          console.log(id);
          this.expensesService.delete(id).subscribe({
            next: (resp) => {          
              this.loadData();
            },
            error: (err) => {          
              toast.error('Expense tracker', {
                description: 'Error deleting expense',
              });
  
            }
          });
        },
        zWidth: '425px'
      });
    }
}
