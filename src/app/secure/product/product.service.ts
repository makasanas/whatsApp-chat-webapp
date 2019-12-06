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

  sync() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'sync/products', { headers: headers }).pipe(map((response: any) => response.json()));
  }

  getProduct() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'products', { headers: headers }).pipe(map((response: any) => response.json()));
  }

  
}

