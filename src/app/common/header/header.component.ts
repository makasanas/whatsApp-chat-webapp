import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public storeName: string = "Dev Store";
  public menu: any = {
    header: false
  };
  
  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.menu['header'] = false;
      }
    });
  }

  ngOnInit() {
  }

  changeMenu(name) {
    this.menu[name] = !this.menu[name];
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('shopUrl');
  }
}
