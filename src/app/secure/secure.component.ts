import { Component, OnInit } from '@angular/core';
import { SecureService } from "./secure.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  public user = false;
  public fetchUser = false;

  constructor(private router: Router, private secureService: SecureService) {
    this.secureService.checkToken().subscribe((res) => {
      this.user = true;
      this.fetchCollection();
      this.getUser();
    }, err => {
      this.user = false;
      localStorage.removeItem('token');
      localStorage.removeItem('shopUrl');
      this.router.navigate(['/install']);
    });
  }

  ngOnInit() {

  }

  fetchCollection() {
    this.secureService.fetchCollection().subscribe((res) => {
      this.secureService.setCollection(res.data.collections);
    }, err => {
      console.log(err);
    });
  }

  getUser() {
    this.secureService.fetchUser().subscribe((res) => {
      this.secureService.setUser(res.data);
      this.fetchUser = true;
      if (!this.router.url.includes('activeplan')) {
        if (res.data.recurringPlanType === 'Free') {
          this.router.navigate(['/pricing']);
        } else if (!res.data.refresh_token || !res.data.merchantId) {
          if (!this.router.url.includes('setup')) {
            this.router.navigate(['/setup']);
          }
        }
      }
    }, err => {
      console.log(err);
    });
  }

  setUser() {

  }
}