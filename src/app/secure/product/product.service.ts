import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http, private router: Router) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
  }


  addSettings(data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.apiUrl + 'settings', data, { headers: headers }).pipe(map((response: any) => response.json()));
  }
  getSetting() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.apiUrl + 'settings/' + localStorage.getItem('shopUrl'), { headers: headers }).pipe(map((response: any) => response.json()));
  }
}





