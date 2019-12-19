import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  public popupActive = false;
  public notification: any = {
    "success": true,
    "info": true,
    "danger": true,
    "warning": true
  }
  // public testtab:any={
  //   "tab1":true,
  //   "tab2":false,
  //   "tab3":false
  // }

  public syncProcess: boolean = false;
  public listIssues: any = null;

  public tabs = {
    list: [
      {
        tab: 'home',
        label: 'Home'
      },
      {
        tab: 'products',
        label: 'Products'
      }
      , {
        tab: 'collections',
        label: 'Collections'
      }
    ],
    activeTab: 'products'
  }

  constructor() { }

  ngOnInit() {
  }

  changePopup() {
    this.popupActive = !this.popupActive;
  }

  resetForm() {
    this.changePopup();
  }

  changeTab(tab) {
    this.tabs.activeTab = tab;
  }

  closeNotification(alert, link) {
    this[alert][link] = false;
  }
}
