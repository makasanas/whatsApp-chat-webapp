import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupService } from './setup.service';
import { SecureService } from "./../secure.service";


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public loading = false;
  public showGoogleButton = false;
  public merchantId;
  public user;

  constructor(private route: ActivatedRoute, private secureService: SecureService, private setupService: SetupService, private router: Router) { }

  ngOnInit() {
    this.user = this.secureService.getUser();

    this.checkToken();
  }

  checkToken() {
    if (!this.user.refresh_token || !this.user.merchantId) {
      this.showGoogleButton = true;
      this.loading = false;
      this.checkCode();
    } else {
      this.showGoogleButton = false;
      this.loading = false;
    }
  }

  checkCode() {
    console.log(this.showGoogleButton);
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        let query = 'code=' + params['code'];
        query += '&redirect_uri=' + location.origin + location.pathname;
        this.loading = true;
        this.setupService.generateaAuthToken(query).subscribe((res) => {
          this.secureService.setUser(res.data);
          this.showGoogleButton = false;
          this.loading = false;
        }, err => {

        });
      } else {

      }
    })
  }

  // setMerchantId() {
  //   console.log(this.merchantId);
  //   let data = {
  //     merchantId: this.merchantId
  //   }
  //   this.setupService.setMerchantId(data).subscribe((res) => {
  //     console.log(res.data);
  //     this.showGoogleButton = false;
  //   }, err => {
  //   });
  // }

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
