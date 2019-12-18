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

  getProduct(limit, page) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'products?limit=' + limit + '&page=' + page, { headers: headers }).pipe(map((response: any) => response.json()));
  }
  searchProduct(limit, page, filter) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    filter.text = filter.type == 'all' ? '' : filter.text;
    filter.type = filter.type == 'all' ? '' : filter.type;
    return this.http.get(environment.apiUrl + 'products?limit=' + limit + '&page=' + page + '&search=' + filter.text + '&type=' + filter.type, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  getProductTypes() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'producttype', { headers: headers }).pipe(map((response: any) => response.json()));
  }

  syncProducts() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'sync/products', { headers: headers }).pipe(map((response: any) => response.json()));
  }


}

