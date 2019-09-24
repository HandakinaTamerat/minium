import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { environment as env } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
api=env.authApiUrl;
  constructor(private http:HttpClient) { }

  storeToken(obj){
    localStorage.setItem("auth-token",obj);
  }

  checkEmail(email){
    return this.http.post(`${this.api}/users/emailcheck`,email);
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


}
