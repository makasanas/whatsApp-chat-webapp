import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }


  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
  }

  getProduct(query, page) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'products?'+query+'&limit='+page.limit+'&page='+(page.offset+1), { headers: headers }).pipe(map((response: any) => response.json()));
  }

  addInQueue(data){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'queue/add',  data, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  getCredit(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'credit', { headers: headers }).pipe(map((response: any) => response.json()));
  }

}