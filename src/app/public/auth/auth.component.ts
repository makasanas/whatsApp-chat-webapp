import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { switchMap, debounceTime } from "rxjs/operators" // RxJS v6


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

	public code: string;
	public hmac: string;
	public shop: string;

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if(params['hmac']){
				// console.log(params);
				this.hmac = this.route.snapshot.queryParamMap.get('hmac');
				this.shop = this.route.snapshot.queryParamMap.get('shop');
				this.getAccessToken(this.route.snapshot['_routerState'].url);
			}
		})
	}

	getAccessToken(query) {
		// console.log(query);
		this.authService.getAccessToken(query).subscribe((res) => {
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("shopUrl", res.data.shopUrl);
			if (res.data.passwordSet) {
				this.router.navigate(['/dashboard']);
			} else {
				this.router.navigate(['/password'], { queryParams: { shopUrl: res.data.domain, email: res.data.email } });
			}
		}, err => {
			this.router.navigate(['/install']);
			// console.log(err);
		});
	}

}
