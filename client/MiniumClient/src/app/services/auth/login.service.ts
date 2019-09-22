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
    return this.http.post('/api/login',user);
  }

  storeToken(obj){
    localStorage.setItem("auth-token",obj);
  }

  getToken(){
    return localStorage.getItem("auth-token");
  }




  checkUserName(name){

  }

  checkPassword(password){

  }


}
