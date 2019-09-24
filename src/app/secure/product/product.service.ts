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

  getCollection() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'collections' , { headers: headers }).pipe(map((response: any) => response.json()));
  }

  getDescription(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'product/description',  data, { headers: headers }).pipe(map((response: any) => response.json()));
  }

}