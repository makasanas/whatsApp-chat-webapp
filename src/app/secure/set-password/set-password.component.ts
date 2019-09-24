import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetPasswordService } from './set-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  public setPasswordForm: FormGroup;
  public shop: string;
  public email: string;
  public password: string;


  constructor(private route: ActivatedRoute, private router: Router, private setPasswordService: SetPasswordService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.shop = this.route.snapshot.queryParamMap.get('shopUrl');
    this.email = this.route.snapshot.queryParamMap.get('email');
    // console.log(this.setPasswordForm);

  }

  // get f() { return this.setPasswordForm.controls; }

  setPassword() {


    // console.log(this.setPasswordForm);
    if (!this.setPasswordForm.invalid) {
      this.setPasswordService.setPassword(this.setPasswordForm.value).subscribe((res) => {
        // localStorage.setItem('token', JSON.stringify(res.data.token));
        // localStorage.setItem('shopUrl', JSON.stringify(res.data.domain));
        this.router.navigate(['/dashboard']);
      }, err => {
        this.router.navigate(['/login']);
        // console.log(err);
      });
    }
    else {
      Object.keys(this.setPasswordForm.controls).forEach(key => {
        this.setPasswordForm.get(key).markAsDirty();
      });
    }

  }
}


