import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email: string;
  public forgotPasswordForm: FormGroup;
  public serverErrorr: string;
  public serverErrorrCode: any;
  public serverErrorrMsg: any;
  public linkSent: boolean = false;
  public data: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private _fpService: ForgotPasswordService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

  }

  sendLink() {
    this.data = {
      "email": this.forgotPasswordForm.controls.email.value,
      "appdomain": window.location.origin
    }

    this.serverErrorr = '';
    this.serverErrorrCode = '';
    if (!this.forgotPasswordForm.invalid) {
      this._fpService.forgotPassword(this.data).subscribe((res) => {
        // console.log(res);
        this.linkSent = true;
        // this.router.navigate(['/productlist']);
      }, err => {
        this.router.navigate(['/forgot-password']);
        this.serverErrorr = JSON.parse(err._body).message;
        this.serverErrorrCode = JSON.parse(err._body).code;
        // console.log(this.serverErrorrCode)
      });
    }
    else {
      Object.keys(this.forgotPasswordForm.controls).forEach(key => {
        this.forgotPasswordForm.get(key).markAsDirty();
      });
    }
  }

}
