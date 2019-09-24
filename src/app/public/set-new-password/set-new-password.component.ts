import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetNewPasswordService } from './set-new-password.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  public email: string;
  public passwordResetForm: FormGroup;
  public serverErrorr: string;
  public serverErrorrCode: any;
  public serverErrorrMsg: any;
  public token: any;
  public passSet: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private _rpService: SetNewPasswordService) {

    this.passwordResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  resetPassword() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      // console.log(this.token);
      if (!this.passwordResetForm.invalid) {
        this._rpService.resetPassword(this.token, this.passwordResetForm.value).subscribe((res) => {
          // console.log(res);
          this.passSet = true;
          // this.router.navigate(['/productlist']);
        }, err => {
          // this.router.navigate(['/forgot-password']);
          this.serverErrorr = JSON.parse(err._body).message;
          this.serverErrorrCode = JSON.parse(err._body).code;
          // console.log(this.serverErrorrCode)
        });
      }
      else {
        Object.keys(this.passwordResetForm.controls).forEach(key => {
          this.passwordResetForm.get(key).markAsDirty();
        });
      }
    });
  }

}
