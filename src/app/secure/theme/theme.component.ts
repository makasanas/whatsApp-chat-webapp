import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  public popupActive = false;
  public notification: any={
    "success":true,
    "info":true,
    "danger":true,
    "warning":true
  }
  public testtab:any={
    "tab1":true,
    "tab2":false,
    "tab3":false
  }
  constructor() { }

  ngOnInit() {
  }

  changePopup() {
    this.popupActive = !this.popupActive;
  }

  resetForm(){
    this.changePopup();
  }

  changetab(tabcontainer,tab){
    Object.keys(this.testtab).forEach((element) => this.testtab[element] = false);
    this[tabcontainer][tab]=true;
  }

  closeNotification(alert,link){
    this[alert][link]=false;
  }
}
