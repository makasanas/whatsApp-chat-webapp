import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class SecureService {

    public collections = new Subject<any>();
    public collectionData = [];
    public user = [];



    constructor(private http: Http, private router: Router) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
    }

    fetchCollection() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'collections', { headers: headers }).pipe(map((response: any) => response.json()));
    }

    setCollection(data) {
        this.collections.next(data);
        this.collectionData = data;
    }

    checkToken() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'user/checktoken', { headers: headers }).pipe(map((response: any) => response.json()));
    }

    getCollection() {
        return this.collectionData;
    }

    fetchUser() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'user/profile', { headers: headers }).pipe(map((response: any) => response.json()));
    }

    setUser(data) {
        this.user = data;
    }

    getUser() {
        return this.user;
    }

    sendRoute(user) {
        if (!this.router.url.includes('activeplan')) {
            if (!user.recurringPlanType || user.recurringPlanType === 'Free') {
                this.router.navigate(['/pricing']);
            } else {
                this.router.navigate(['/product']);
            }
        }
    }
}