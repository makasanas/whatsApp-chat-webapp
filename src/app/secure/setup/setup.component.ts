import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupService } from './setup.service';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public loading = false;
  public showGoogleButton = false;
  public merchantId;

  constructor(private route: ActivatedRoute, private setupService: SetupService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.setupService.getUser().subscribe((res) => {
      if (!res.data.access_token || !res.data.refresh_token || !res.data.merchantId) {
        this.showGoogleButton = true;
        this.checkCode();
      }
    }, err => {
    });
  }

  checkCode() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        let query = 'code=' + params['code'];
        query += '&redirect_uri=' + location.origin + location.pathname;
        this.loading = true;
        this.setupService.generateaAuthToken(query).subscribe((res) => {
          console.log(res.data);
          this.showGoogleButton = false;
          this.loading = false;
        }, err => {

        });
      } else {

      }
    })
  }

  setMerchantId() {
    console.log(this.merchantId);
    let data = {
      merchantId: this.merchantId
    }
    this.setupService.setMerchantId(data).subscribe((res) => {
      console.log(res.data);
      this.showGoogleButton = false;
    }, err => {
    });
  }

  signInWithGoogle() {
    let scope = 'https://www.googleapis.com/auth/content';
    let response_type = 'code';
    let access_type = 'offline';
    let redirect_uri = window.location.origin + '/app/setup';
    let client_id = '825133742036-5aj1qk5sdfni90g5175pma62kssgb52e.apps.googleusercontent.com';

    let installUrl = "https://accounts.google.com/o/oauth2/auth?scope=" + scope + "&response_type=" + response_type + "&access_type=" + access_type + "&redirect_uri=" + redirect_uri + "&client_id=" + client_id;
    document.location.href = installUrl;
  }
}
