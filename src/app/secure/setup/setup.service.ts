import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class SetupService {

    public collections = new Subject<any>();
    public collectionData = [];


    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
    }

    generateaAuthToken(query) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'user/generateauthtoken?' + query, { headers: headers }).pipe(map((response: any) => response.json()));
    }

    getUser() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'user/profile', { headers: headers }).pipe(map((response: any) => response.json()));
    }

    setMerchantId(data){
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(environment.apiUrl + 'user/setmerchantid',  data, { headers: headers }).pipe(map((response: any) => response.json()));
      }


}