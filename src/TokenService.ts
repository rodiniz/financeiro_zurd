import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenName:string ='fin_auth_token'
  setAuthToken(token:string){
    localStorage.setItem(this.tokenName,token)
  }
  getAuthToken(){
    return localStorage.getItem(this.tokenName);
  }

}
