import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureService } from "./../secure.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public planData: any = {
    planName: ''
  };
  public planPrice: number;
  public loading: boolean = false;
  public recurring_application_charge: any = {};
  public recurringCharge: any = {
    recurring_application_charge: {
    }
  };
  public user: any;
  public trial: any = {
    days: 14,
    nextMonthStartDate: new Date
  };
  public freeTrialDays: number = 14;
  public pricingPlans: any = {
    plans: [
      {
        name: 'Basic',
        price: 4.99,
        features: [
          "UP TO 500 PRODUCTS"
        ]
      },
      {
        name: 'Silver',
        price: 9.99,
        features: [
          "500-1000 PRODUCTS"
        ]
      },
      {
        name: 'Gold',
        price: 14.99,
        features: [
          "1000-5000 PRODUCTS"
        ]
      },
      {
        name: 'Platinum',
        price: 19.99,
        features: [
          "Unlimited Products"
        ]
      }
    ],
    activePlan: '',
    activePlanIndex: 0
  };
  constructor(private pricingService: PricingService, private secureService: SecureService, private router: Router, ) { }

  ngOnInit() {
    this.user = this.secureService.getUser();
    this.checkPlan();
  }

  checkTrial() {
    let dt2 = new Date();
    let dt1 = new Date(this.trial['start']);
    let tmpDays = this.trial['days'] - Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    this.trial['days'] = tmpDays > 0 ? tmpDays : 0;
  }

  checkPlan() {
    this.loading = true;

    if (this.user) {
      if (Object.keys(this.user).indexOf('trial_days') == -1) {
        this.trial['days'] = this.freeTrialDays;
      } else {
        if (this.user.trial_days != null) {
          this.trial['days'] = this.user.trial_days;
        } else {
          this.trial['days'] = this.freeTrialDays;
        }
      }
    }

    console.log(this.trial['days']);
    this.trial['start'] = !this.user.trial_start ? new Date() : this.user.trial_start;
    this.checkTrial();
    if (!this.user.recurringPlanType || this.user.recurringPlanType === 'Free') {
      let count = this.user.productCount;
      let plan: any = {}
      if (count <= 500) {
        plan['name'] = "Basic";
        plan['price'] = 4.99;
      } else if (count > 500 && count <= 1000) {
        plan['name'] = "Silver";
        plan['price'] = 9.99;
      } else if (count > 1000 && count <= 5000) {
        plan['name'] = "Gold";
        plan['price'] = 14.99;
      } else {
        plan['name'] = "Platinum";
        plan['price'] = 19.99;
      }
      this.acceptPlan(plan.name, plan.price);
      this.pricingPlans.activePlan = plan.name;
      // console.log(this.pricingPlans);
    } else {
      this.getPlan();
    }
  }

  getPlan() {
    this.loading = true;
    this.pricingService.getPlan().subscribe((res) => {
      // console.log(res.data);
      this.loading = false;
      this.planData = res.data;
      this.pricingPlans.activePlan = res.data.planName;
      this.pricingPlans.activePlanIndex = this.pricingPlans.plans.findIndex(p => p.name == this.pricingPlans.activePlan);
      // console.log(this.pricingPlans);
    }, err => {
    });
  }

  acceptPlan(planName, planPrice) {
    this.recurringCharge.recurring_application_charge.name = planName;
    this.recurringCharge.recurring_application_charge.price = planPrice;
    this.recurringCharge.recurring_application_charge.trial_days = this.trial['days'];
    this.recurringCharge.recurring_application_charge.return_url = window.location.origin + "/app/activeplan";
    if (localStorage.getItem('shopUrl') == 'dev-srore.myshopify.com' || localStorage.getItem('shopUrl') == 'webrex-test-store.myshopify.com') {
      this.recurringCharge.recurring_application_charge.test = true;
    } else {
      this.recurringCharge.recurring_application_charge.test = environment.testCharge;
    }
    this.pricingService.acceptPlan(this.recurringCharge).subscribe((res) => {
      var installUrl = res.data.recurring_application_charge.confirmation_url;
      document.location.href = installUrl;
    }, err => {
      console.log(err);
    });
  }

  activeBasicPlan() {
    this.pricingService.basePlane().subscribe((res) => {
      // console.log(res)
      this.getPlan();
    }, err => {
      console.log(err);
    });
  }
}
