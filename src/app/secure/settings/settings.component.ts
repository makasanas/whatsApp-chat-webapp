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
  // public storeName: String;
  // public emailID: String;
  // public phone: String;
  public storeData: Object = {};
  public syncData: Object = {};
  public loading = false;
  public planError: boolean = false;
  public tabs = {
    list: [
      {
        tab: 'details',
        label: 'Store Details',
      }, {
        tab: 'sync',
        label: 'Sync'
      }
    ],
    activeTab: 'details'
  };

  constructor(private settingsService: SettingsService, ) { }

  ngOnInit() {
    this.getPlan();
    this.getUser();
    this.getSyncDetails();
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
      this.storeData = res.data;
      // this.storeName = res.data.storeName;
      // this.emailID = res.data.email;
      // this.phone = res.data.phone;
    }, err => {
    });
  }

  getSyncDetails() {
    this.settingsService.getSyncDetails().subscribe((res) => {
      console.log(res.data);
      this.syncData = res.data;
    }, err => {
      console.log(err);
    });
  }

  deactivePlan() {
    this.settingsService.deactivePlan(this.planId).subscribe((res) => {
      this.getPlan()
    }, err => {
      // console.log(err);
    });
  }

  syncProducts() {
    this.loading = true;
    this.settingsService.syncProducts().subscribe((res) => {
      console.log(res.message);
      if (res.message == 'OK') {
        this.loading = false;
      }
      // this.getPlan()
    }, err => {
      // console.log(err);
      this.changeBoolean('planError', true);
    });
  }

  changeTab(tab) {
    this.tabs.activeTab = tab;
  }

  changeBoolean(variable: string, value: boolean) {
    this[variable] = value;
  }

}
