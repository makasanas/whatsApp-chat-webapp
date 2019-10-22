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
    return this.http.get(environment.apiUrl + 'products?' + query + '&limit=' + page.limit, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  getProductByLink(link) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    if (link.includes("newquery")) {
      return this.http.get(environment.apiUrl + 'products?' + link, { headers: headers }).pipe(map((response: any) => response.json()));
    } else {
      link = encodeURIComponent(link)
      return this.http.get(environment.apiUrl + 'products?link=' + link, { headers: headers }).pipe(map((response: any) => response.json()));

    }
  }

  addInQueue(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'queue/add', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  create(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'product', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }


  productStatuses(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'productstatuses', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  accountStatuses(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'accountstatuses', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }

  singleProductStatuses(productId) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'productstatuses/' + productId, { headers: headers }).pipe(map((response: any) => response.json()));
  }


  bulkDelete(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'productdelete', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }
}

