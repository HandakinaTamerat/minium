import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeToken(obj){
    localStorage.setItem("auth-token",obj);
  }

  getToken(){
    return localStorage.getItem("auth-token");
  }
}
