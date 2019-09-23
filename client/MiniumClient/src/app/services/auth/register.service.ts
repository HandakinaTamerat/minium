import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/sharedmodules/user.models';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.authApiUrl;
  constructor(private http:HttpClient,private authService:AuthService) {  }

  register(user:User){
    return this.http.post(`${this.apiUrl}/register`,user);
  }

  storeToken(data){
    this.authService.storeToken(data);
  }

}
