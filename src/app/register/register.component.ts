import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { generateId } from '@shared/utils/merge-classes';
import { AuthService } from '../auth.service';
import { ZardFormControlComponent } from '@shared/components/form/form.component';
import { ZardFormModule } from '@shared/components/form/form.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
  imports: [
    ZardCardComponent,ZardButtonComponent,
    ZardFormControlComponent,ZardFormModule, 
    ZardInputDirective,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

    private router= inject(Router);
    protected readonly idEmail = generateId('email');
    protected readonly idPassword = generateId('password');
    private authservice= inject(AuthService);
    loginForm= new FormGroup({    
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    });

    get passwordControl() {
      return this.loginForm.get('password')!;
    }
  
    get emailControl() {
      return this.loginForm.get('email')!;
    }
    goHome() {
      this.router.navigate(['']);
    }
    signUp(){
      
      if(this.loginForm.valid){
        const {email, password}=this.loginForm.value;
        this.authservice.signUp(email??'',password??'').subscribe({
          next:()=>{
            this.router.navigate(['']);
          },
          error:(err)=>{
             toast.error('Something went wrong', {
              description: 'There was a problem with your request.',
            });
            console.info(err);
          }
        });
      }
    } 
}
