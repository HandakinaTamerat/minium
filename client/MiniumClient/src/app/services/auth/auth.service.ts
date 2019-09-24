import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  storeToken(obj){
    localStorage.setItem("auth-token",JSON.stringify(obj.token));
  }

  getToken(){
    return JSON.parse(localStorage.getItem("auth-token"));
  }

  storeUser(user){
    localStorage.setItem('user-data',user);
  }

  getUser(){
    return localStorage.getItem('user-data');
  }

  isUserLoggedIn() {
    if( localStorage.getItem('auth-token') == null ) {
      return false
    }
    return true
  }

}
