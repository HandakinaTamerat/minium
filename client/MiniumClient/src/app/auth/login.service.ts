import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  subscription;
  constructor(private http:HttpClient) { }

  getUsers(){

  }

  login(user){
    this.subscription =
    this.http.post('http://localhost/api/login',user)
    .subscribe(data=>{
        console.log(data);
    })
  }

  checkUserName(name){

  }

  checkPassword(password){

  }


}
