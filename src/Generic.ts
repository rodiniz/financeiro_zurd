import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedData } from './app/models/PagedData';

@Injectable({
  providedIn: 'root'
})
export abstract  class GenericService<T> {
  httpclient= inject(HttpClient);
  _urlgroup:string;
  constructor(UrlGroup:string) {
    this._urlgroup=UrlGroup;
  }
  get(id:number){
        return this.httpclient.get<T>(`/api/${this._urlgroup}/${id}`);
  }
  getPaged(orderBy:string,pageIndex:number,pageSize:number=10){
        return this.httpclient.get<PagedData<T>>(`/api/${this._urlgroup}?Skip=${pageIndex}&Take=${pageSize}&OrderBy=${orderBy}`);
  }
  post(entity:T){
    return this.httpclient.post(`/api/${this._urlgroup}`,entity)
  }
  put(id:number, entity:Partial<T>){
    return this.httpclient.put(`/api${this._urlgroup}/${id}`,entity)
  }
  delete(id:number){
    return this.httpclient.delete(`/api${this._urlgroup}/${id}`) 
  }
}
