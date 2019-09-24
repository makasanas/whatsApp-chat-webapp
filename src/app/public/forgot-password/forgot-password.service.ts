import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: Http) { }

  forgotPassword(data) {
      return this.http.post(environment.apiUrl + '/user/forgetPassword', data).pipe(map((response: any) => response.json()));
  }
}
