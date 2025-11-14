import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  client=inject(HttpClient);
  constructor() { 
  }
 
  logIn(username:string, password:string){
    const body = {  
      email:username,
      password:password
    };
    return this.client.post('/api/login', body);
   }
   signUp(username:string, password:string){
    const body = {  
      email:username,
      password:password
    };
    return this.client.post('/api/register', body);
   }

  isAuthenticated(){
    return localStorage.getItem('fin_auth_token') !==null
  }

}
