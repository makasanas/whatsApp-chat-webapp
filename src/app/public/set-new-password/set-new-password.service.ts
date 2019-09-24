import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetNewPasswordService {

  constructor(private http: Http) { }

  resetPassword(token, data) {
    return this.http.post(environment.apiUrl + 'user/reset/' + token, data).pipe(map((response: any) => response.json()));
  }
}
