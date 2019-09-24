import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivePlanService } from './active-plan.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-active-plan',
  templateUrl: './active-plan.component.html',
  styleUrls: ['./active-plan.component.scss']
})
export class ActivePlanComponent implements OnInit {
  public planID: any;
  public loading: boolean = false;

  constructor(private route: ActivatedRoute, private activePlanService: ActivePlanService) { }

  ngOnInit() {
    this.loading = true;
    this.planID = this.route.snapshot.queryParamMap.get('charge_id');
    this.activePlanService.activePlan(this.planID).subscribe((res) => {
      this.loading = false;
    }, err => {
      // console.log(err);
    });
  }

}
