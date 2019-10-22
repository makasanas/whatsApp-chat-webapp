import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SecureService } from "./secure/secure.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public route: string = '';

  constructor(private router: Router, private secureService: SecureService, private location: Location) {
    console.log(this.route)
    console.log(location.path() != this.route )

    if (this.route != location.path()) {
      this.route = location.path();
      console.log(this.route)
      console.log(location.path())

      // this.router.events.subscribe((event) => {
      //   if (event instanceof NavigationStart) {
      //     this.secureService.sendRoute(this.secureService.getUser());
      //   }
      // });
    }
  }
}
