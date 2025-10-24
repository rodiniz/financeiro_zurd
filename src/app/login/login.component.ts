import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardFormModule } from '@shared/components/form/form.module';
import { generateId } from '@shared/utils/merge-classes';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { AuthService } from '../auth.service';
import { toast } from 'ngx-sonner';
import { Token } from '../models/Token';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ZardCardComponent, ZardButtonComponent,
    ZardFormModule, ZardInputDirective, ZardFormModule],
  templateUrl:'./login.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private router= inject(Router);
  private authservice= inject(AuthService);
  protected readonly idEmail = generateId('email');
  protected readonly idPassword = generateId('password');
  categories:any;
  loginForm= new FormGroup({    
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get passwordControl() {
    return this.loginForm.get('password')!;
  }
 
  get emailControl() {
    return this.loginForm.get('email')!;
  }

  goToRegister() {
    this.router.navigate(['Register'])
  }
  async login(){
       if(this.loginForm.valid){
            const {email, password}=this.loginForm.value;
            this.authservice.logIn(email??'',password??'').subscribe({
              next:(resp)=>{               
                var tk= resp as Token;
                this.authservice.setAuthToken(tk.accessToken)
                this.router.navigate(['dashboard']);
              },
              error:(err)=>{
                 toast.error('Expense tracker', {
                  description: 'Ivalid user name or password',
                });
              }
            });
          }
    }
 }
