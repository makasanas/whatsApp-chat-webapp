import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SetPasswordService {

    constructor(private http: Http) { }


    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('token'));
    }


    setPassword(data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(environment.apiUrl + 'shopify/setPassword', data, { headers: headers }).pipe(map((response: any) => response.json()));
    }
}