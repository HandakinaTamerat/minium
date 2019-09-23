import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeToken(obj){
    localStorage.setItem("auth-token",JSON.stringify(obj));
  }

  getToken(){
    return JSON.parse(localStorage.getItem("auth-token"));
  }
}
