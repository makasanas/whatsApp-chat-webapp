import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public planName: String;
  public planId: number;
  public startDate: String;
  public endDate: String;
  public storeName: String;
  public emailID: String;
  public phone: String;

  constructor(private settingsService: SettingsService, ) { }

  ngOnInit() {
    this.getPlan(),
      this.getUser()
  }
  getPlan() {
    this.settingsService.getPlan().subscribe((res) => {
      this.planName = res.data.planName;
      this.planId = res.data._id;
      this.startDate = res.data.started;
      this.endDate = res.data.nextBillDate;
    }, err => {
    });
  }
  getUser() {
    this.settingsService.getUser().subscribe((res) => {
      // console.log(res.data)
      this.storeName = res.data.storeName;
      this.emailID = res.data.email;
      this.phone = res.data.phone;
    }, err => {
    });
  }
  deactivePlan() {
    this.settingsService.deactivePlan(this.planId).subscribe((res) => {
      this.getPlan()
    }, err => {
      // console.log(err);
    });
  }
}
