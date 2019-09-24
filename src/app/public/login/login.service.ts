import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    login(data) {
        return this.http.post(environment.apiUrl + 'shopify/login', data).pipe(map((response: any) => response.json()));
    }
}