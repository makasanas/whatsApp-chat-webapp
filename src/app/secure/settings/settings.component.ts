import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { SecureService } from '../secure.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

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
  public syncProcess: any = {
    products: false
  };
  public appForm: FormGroup;

  constructor(private settingsService: SettingsService, private secureService: SecureService, private fb: FormBuilder) {
    this.appForm = this.fb.group({
      "appEnabled": new FormControl("false")
    });
  }

  ngOnInit() {
    this.getPlan();
    this.getUser();
    this.getSyncData();
    this.getAppStatus();
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

  getSyncData() {
    this.settingsService.getSyncData().subscribe((res) => {
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

  // syncProducts() {
  //   this.loading = true;
  //   this.settingsService.syncProducts().subscribe((res) => {
  //     console.log(res.message);
  //     if (res.message == 'OK') {
  //       this.loading = false;
  //     }
  //     // this.getPlan()
  //   }, err => {
  //     // console.log(err);
  //     this.changeBoolean('planError', true);
  //   });
  // }

  changeTab(tab) {
    this.tabs.activeTab = tab;
  }

  changeBoolean(variable: string, value: boolean) {
    this[variable] = value;
  }

  sync(type: string) {
    this.syncProcess[type] = true;
    this.secureService.sync(type).subscribe((res) => {
      console.log(res);
      this.syncProcess[type] = false;
      this.getSyncData();
    }, err => {
      this.syncProcess[type] = false;
      console.log(err);
      if (err.status == 402) {
        this.changeBoolean('planError', true);
      }
    });
  }

  statusChanged(event: any) {
    this.secureService.changeAppStatus({ "shopUrl": localStorage.getItem('shopUrl'), "appEnabled": this.appForm.controls.appEnabled.value }).subscribe((res) => {
      console.log(res);
      this.getAppStatus();
    }, err => {
      this.getAppStatus();
      console.log(err);
    });

  }

  getAppStatus() {
    let user = this.secureService.getUser();
    // this.enableForm = user.appEnabled;
    this.secureService.fetchUser().subscribe((res) => {
      console.log(res['data']['appEnabled']);
      this.appForm.controls.appEnabled.setValue(res['data']['appEnabled']);
      console.log(this.appForm.controls.appEnabled.value);
    }, err => {
      console.log(err);
    });
  }

}

