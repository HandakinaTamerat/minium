import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;subscription;error;
  constructor(private builder:FormBuilder,private route:Router,private registerService:RegisterService) { }

  ngOnInit() {
    this.form=this.builder.group({
      'email':['',Validators.compose([Validators.required,Validators.email])],
      'first_name':['',Validators.required],
      'last_name':['',Validators.required],
      'username':['',Validators.required],
      'password':['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  register(){
    this.subscription=
    this.registerService.register(this.form.value)
    .subscribe(data=>{
      this.saveToken(data);
      this.goToHomePage();
    },error=>{
      const err=JSON.stringify(error.error);
      this.error=JSON.parse(err).error
    })
  }

  saveToken(data){
    this.registerService.storeToken(data);
  }

  goToHomePage(){
    this.route.navigate(['/posts/home']);
  }


  redirectToLogin(){
    this.route.navigate(['/users/login']);
  }

  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
