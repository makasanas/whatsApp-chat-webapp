import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivePlanService {

    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
    }

    activePlan(id) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(environment.apiUrl + 'recurring' + '/plan' + '/active/' + id, {}, { headers: headers }).pipe(map((response: any) => response.json()));
    }

}
