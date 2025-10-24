import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract  class GenericService<T> {
  httpclient= inject(HttpClient);
  _urlgroup:string;
  constructor(UrlGroup:string) {
    this._urlgroup=UrlGroup;
  }

  get(){
    return this.httpclient.get<Observable<Array<T>>>(`/api/${this._urlgroup}`);
  }
  post(entity:T){
    this.httpclient.post(`/api${this._urlgroup}`,entity)
  }
  put(id:number, entity:T){
    this.httpclient.put(`/api${this._urlgroup}`,entity)
  }
  delete(id:number){
    this.httpclient.delete(`/api${this._urlgroup}/{id}`) 
  }
}
