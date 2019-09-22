import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
<<<<<<< HEAD
import { LoginService } from 'src/app/services/auth/login.service';
=======
import { Router } from '@angular/router';
>>>>>>> 17911a85646111da859e9531d7327d920c8551fe

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  public form;
  constructor(private builder:FormBuilder, private loginService: LoginService) { }
=======
  form;
  constructor(private builder:FormBuilder,private route:Router,private authService:AuthService) { }
>>>>>>> 17911a85646111da859e9531d7327d920c8551fe

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'password':['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

<<<<<<< HEAD
  async login() {
    console.log(this.form)
    // await this.loginService.login(this.form)
=======
  login(){
    this.authService.login(this.form.value);
  }

  redirectToRigester(){
    this.route.navigate(['/users/signup']);
>>>>>>> 17911a85646111da859e9531d7327d920c8551fe
  }

}
