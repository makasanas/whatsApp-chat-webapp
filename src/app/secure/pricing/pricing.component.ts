import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public planName: String;
  public planPrice: number;
  public loading: boolean = false;
  public recurring_application_charge: any = {};
  public recurringCharge: any = {
    recurring_application_charge: {
    }
  };

  constructor(private pricingService: PricingService, private router: Router, ) { }

  ngOnInit() {
    this.getPlan();
  }
  getPlan() {
    this.loading = true;
    this.pricingService.getPlan().subscribe((res) => {
      this.loading = false;
      this.planName = res.data.planName;
    }, err => {
    });
  }

  acceptPlan(planName, planPrice) {
    this.recurringCharge.recurring_application_charge.name = planName;
    this.recurringCharge.recurring_application_charge.price = planPrice;
    this.recurringCharge.recurring_application_charge.return_url = window.location.origin + "/app/activeplan";
    if (localStorage.getItem('shopUrl') == 'dev-srore.myshopify.com' || localStorage.getItem('shopUrl') == 'webrex-test-store.myshopify.com') {
      this.recurringCharge.recurring_application_charge.test = true;
    } else {
      this.recurringCharge.recurring_application_charge.test = true;
    }
    // console.log(this.recurringCharge.recurring_application_charge.test);
    this.pricingService.acceptPlan(this.recurringCharge).subscribe((res) => {
      // window.location.href = 'res.data.recurring_application_charge.confirmation_url';
      // console.log(res)

      var installUrl = res.data.recurring_application_charge.confirmation_url;
      document.location.href = installUrl;
    }, err => {
      // console.log(err);
    });
  }

  activeBasicPlan() {
    this.pricingService.basePlane().subscribe((res) => {
      // console.log(res)
      this.getPlan();
    }, err => {
      // console.log(err);
    });
  }
}
