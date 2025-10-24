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
    return this.httpclient.post(`/api${this._urlgroup}`,entity)
  }
  put(id:number, entity:T){
    return this.httpclient.put(`/api${this._urlgroup}`,entity)
  }
  delete(id:number){
    return this.httpclient.delete(`/api${this._urlgroup}/{id}`) 
  }
}
