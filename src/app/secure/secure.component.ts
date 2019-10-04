import { Component, OnInit } from '@angular/core';
import { SecureService } from "./secure.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  public user = false;

  constructor(private router: Router, private secureService: SecureService) {
    this.secureService.checkToken().subscribe((res) => {
      this.user = true;
      this.fetchCollection();
    }, err => {
      this.user = false;
      localStorage.removeItem('token');
      localStorage.removeItem('shopUrl');
      this.router.navigate(['/install']);
    });
  }

  ngOnInit() {
    
  }

  fetchCollection(){
    this.secureService.fetchCollection().subscribe((res) => {
      this.secureService.setCollection(res.data.collections);
    }, err => {
      console.log(err);
    });
  }
}