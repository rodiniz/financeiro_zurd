import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PostgrestClient } from '@supabase/postgrest-js'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private client=inject(HttpClient);
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

}
