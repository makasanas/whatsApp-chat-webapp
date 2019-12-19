import { Component, OnInit, Renderer2 } from '@angular/core';
import { SecureService } from "./secure.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var $crisp;
declare global {
  interface Window { $crisp: any; CRISP_WEBSITE_ID: any; }
}

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  public user = false;
  public fetchUser = false;
  public userData;

  constructor(private router: Router, private secureService: SecureService, private renderer: Renderer2) {
    this.secureService.checkToken().subscribe((res) => {
      this.user = true;
      this.getUser();

    }, err => {
      this.user = false;
      localStorage.removeItem('token');
      localStorage.removeItem('shopUrl');
      this.router.navigate(['/install']);
    });
  }

  ngOnInit() {

  }

  getUser() {
    this.secureService.fetchUser().subscribe((res) => {
      this.secureService.setUser(res.data);
      this.fetchUser = true;
      this.loadChat();
      this.secureService.sendRoute(this.secureService.getUser());
    }, err => {
      console.log(err);
    });
  }


  loadChat() {
    this.userData = this.secureService.getUser();

    if (!this.userData.admin && this.userData.domain != 'dev-srore.myshopify.com') {
      window.$crisp = []; window.CRISP_WEBSITE_ID = "e709e725-c026-4052-a8f4-377bb9b15f96";
      this.addJsToElement('https://client.crisp.chat/l.js').onload = () => {
        window.$crisp.push(["set", "user:email", [this.userData.email]]);
        window.$crisp.push(["set", "user:nickname", [this.userData.storeName]]);
        window.$crisp.push(["set", "user:phone", [this.userData.phone]]);
        window.$crisp.push(["set", "session:segments", [[this.userData.recurringPlanName, this.userData.shopUrl, this.userData.productCount,], false]])

        // window.$crisp.push(["set", "session:data", [[
        //   ['shopUrl', this.userData.shopUrl],
        //   ['App Plan', this.userData.recurringPlanName],
        //   ['Credit', this.userData.credit],
        //   ['Shopify Plan', this.userData.plan_display_name]
        // ]]])
        console.log($crisp);
      }
    }
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  setUser() {
  }
}