import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  constructor(private builder:FormBuilder,private route:Router,private loginService:LoginService) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'password':['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  login(){
    this.loginService.login(this.form.value);
  }

  redirectToRigester(){
    this.route.navigate(['/users/signup']);
  }

}
