import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureService } from "./../secure.service";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public planData: Object;
  public planPrice: number;
  public loading: boolean = false;
  public recurring_application_charge: any = {};
  public recurringCharge: any = {
    recurring_application_charge: {
    }
  };
  public user: any;

  constructor(private pricingService: PricingService, private secureService: SecureService, private router: Router, ) { }

  ngOnInit() {
    this.user = this.secureService.getUser();
    this.checkPlan();
  }

  checkPlan() {
    this.loading = true;
    console.log(this.user);
    if (!this.user.recurringPlanType || this.user.recurringPlanType === 'Free') {
      let count = this.user.productCount;
      let plan: any = {}
      if (count < 1000) {
        plan['name'] = "Basic";
        plan['price'] = 9.99;
      } else if (count > 1000 && count < 2000) {
        plan['name'] = "Silver";
        plan['price'] = 19.99;
      } else if (count > 2000 && count < 10000) {
        plan['name'] = "Gold";
        plan['price'] = 14.99;
      } else {
        plan['name'] = "Platinum";
        plan['price'] = 19.99;
      }
      this.acceptPlan(plan.name, plan.price);
    } else {
      this.getPlan();
    }
  }

  getPlan() {
    this.loading = true;
    this.pricingService.getPlan().subscribe((res) => {
      console.log(res.data);
      this.loading = false;
      this.planData = res.data;
    }, err => {
    });
  }

  acceptPlan(planName, planPrice) {
    this.recurringCharge.recurring_application_charge.name = planName;
    this.recurringCharge.recurring_application_charge.price = planPrice;
    this.recurringCharge.recurring_application_charge.trial_days = 7;
    this.recurringCharge.recurring_application_charge.return_url = window.location.origin + "/app/activeplan";
    if (localStorage.getItem('shopUrl') == 'dev-srore.myshopify.com' || localStorage.getItem('shopUrl') == 'webrex-test-store.myshopify.com') {
      this.recurringCharge.recurring_application_charge.test = true;
    } else {
      this.recurringCharge.recurring_application_charge.test = true;
    }
    this.pricingService.acceptPlan(this.recurringCharge).subscribe((res) => {
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
