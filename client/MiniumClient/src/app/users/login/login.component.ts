import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form;
  constructor(private builder:FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.required,Validators.email],
      'password':['',Validators.required,Validators.min(6)]
    });
  }

  async login() {
    console.log(this.form)
    // await this.loginService.login(this.form)
  }

}
