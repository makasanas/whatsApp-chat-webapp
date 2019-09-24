import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isChat: Boolean = false;
  public isMember: Boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url);
        this.isChat = event.url === '/chat' ? true : false;
        this.isMember = event.url == '/' || event.url.includes("install") || event.url.includes("login") || event.url.includes("auth") || event.url.includes("password") ? false : true;
      }
    });
  }
}
