import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.authApiUrl;
  subscription;
  constructor(private http:HttpClient,private auth:AuthService) { }

  login(user){
    return this.http.post(`${this.apiUrl}/login`,user);
  }

  storeToken(obj){
    this.auth.storeToken(obj);
  }

}
