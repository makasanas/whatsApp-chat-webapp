import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public loginForm: FormGroup;
  public serverErrorr: string;
  public serverErrorrCode: any;
  public serverErrorrMsg: any;

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      shopUrl: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  login() {
    this.serverErrorr = '';
    this.serverErrorrCode = '';
    if (!this.loginForm.invalid) {
      this.loginService.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('shopUrl', res.data.shopUrl);
        this.router.navigate(['/dashboard']);
      }, err => {
        this.serverErrorr = JSON.parse(err._body).message;
        this.serverErrorrCode = JSON.parse(err._body).code;
        // console.log(this.serverErrorrCode)
      });
    }
    else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).markAsDirty();
      });
    }
  }
}
