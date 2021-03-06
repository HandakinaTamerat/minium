import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';
import { Observable } from 'rxjs';

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
      'email':['',[Validators.required,Validators.email],this.emailValidation.bind(this)],
      'first_name':['',Validators.required],
      'last_name':['',Validators.required],
      'username':['',Validators.required],
      'password':['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

   emailValidation(control:FormControl):Promise<any> | Observable<any>{

    const promise=new Promise(async (res,rej)=>{
        const val=await this.registerService.checkUserEmail(control.value).toPromise();
        if(!val){
          res(null);
        }else{
          res('INVALID');
        }
    });
    return promise;
  }

  register(){
    this.subscription=
    this.registerService.register(this.form.value)
    .subscribe(data=>{
      this.saveToken(data["token"]);
      this.saveUserData(data["user"]);
      this.goToHomePage();
    },error=>{
      const err=JSON.stringify(error.error);
      this.error=JSON.parse(err).error
    })
  }

  saveToken(data){
    this.registerService.storeToken(JSON.stringify(data));
  }

  goToHomePage(){
    this.route.navigate(['/posts/categories']);
  }

  saveUserData(user){
    this.registerService.storeUser(JSON.stringify(user));
  }

  redirectToLogin(){
    this.route.navigate(['/users/login']);
  }

  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
