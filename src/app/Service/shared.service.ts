import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { CV } from '../CV/CV';

@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    readonly APIUrl="http://cvsystem-001-site1.ctempurl.com/api/CV";
  
    formData: CV = new CV();
    list?: CV[] ;
    
    constructor(private http:HttpClient) { }
  
    refreshList() {
    return this.http.get<any>(this.APIUrl+'/GetAll').pipe(map((res:any)=> {
      return res
    }));
    }
    getCV(id:any){
       this.http.get<any>(this.APIUrl+'/Get/?id='+id).pipe(map((res:any)=> {
        return res
      }));
    }
    addCV(data:any){
      return this.http.post(this.APIUrl+'/Add',data).pipe(map((res:any)=> {
        return res
      }));
    }
    updateCV(data:any, id:number){
      return this.http.put(`${this.APIUrl}/Update?id=${id}`,data).pipe(map((res:any)=> {
        return res
      }));
    }
    deleteCV(id: number){
      return this.http.delete(`${this.APIUrl}/Delete?id=${id}`).pipe(map((res:any)=> {
        return res
      }));
    }
  }
  