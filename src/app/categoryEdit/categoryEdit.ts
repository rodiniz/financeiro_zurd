import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { CategoryService } from 'src/CategoryService';
import { Category } from '../models/Category';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
@Component({
  selector: 'app-category-edit',
  imports: [ReactiveFormsModule, ZardCardComponent, ZardButtonComponent,
    ZardFormModule, ZardInputDirective,FormsModule],
  templateUrl: './categoryEdit.html',
  styleUrl: './categoryEdit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEdit {
  @Input() id: number=0;
  categoryService=inject(CategoryService);
  isEditing: boolean=false;
  isSubmiting=false;
  categoryForm= new FormGroup({    
    id: new FormControl<number>(this.id),
    name: new FormControl('', [Validators.required])
  });
  router=inject(Router);

  get nameControl() {
    return this.categoryForm.get('name')!;
  }

  onSubmit() {
   
    if(this.categoryForm.valid){
        this.isSubmiting=true;
        const { id,name } = this.categoryForm.value;
        const category: Category = {
          id: id as number,
          name:name as string
        };
        this.categoryService.post(category).subscribe({
          next:(resp)=>{                          
            this.router.navigate(['dashboard/categorys']);
          },
          error:(err)=>{
            this.isSubmiting=false;
            toast.error('Expense tracker', {
              description: 'There was an error while trying to edit the category',
            });
            
          }
        });
      }
  }
  cancel() {
     this.router.navigate(['dashboard/categorys']);
  }

}
