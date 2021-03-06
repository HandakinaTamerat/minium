import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/sharedmodules/user.models';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  subscription;
  error;
  constructor(private builder:FormBuilder,private route:Router,private loginService:LoginService, private authService: AuthService) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'password':['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  ngOnChange(){
    console.log(this.error);
  }

  login(){
    this.subscription=
    this.loginService.login(this.form.value).subscribe(data=>{
      this.saveToken(JSON.stringify(data["token"]));
      this.saveUserData(JSON.stringify(data["user"]));
      this.goToHomePage();
      this.authService.isLoggedEmitter.emit('message')
      
    },error=>{
      if(error.error=="Invalid Password") {
        this.error=error.error;
      }else{
        const err=JSON.stringify(error.error);
        this.error=JSON.parse(err).error;
      }

    })
  }
  saveToken(data:string){
    this.loginService.storeToken(data);
  }

  saveUserData(userData){
    this.loginService.storeUser(userData);
  }

  goToHomePage(){
    this.route.navigate(['/posts/page/1']);
  }

  redirectToRigester(){
    this.route.navigate(['/users/signup']);
  }

  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
