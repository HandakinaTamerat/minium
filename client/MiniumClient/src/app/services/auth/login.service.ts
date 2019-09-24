import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { User } from 'src/app/sharedmodules/user.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.authApiUrl;
  subscription;
  constructor(private http:HttpClient,private auth:AuthService) { }

  login(user:User){
    return this.http.post(`${this.apiUrl}/login`,user);
  }

  storeToken(obj:string){
    this.auth.storeToken(obj);
  }

  storeUser(user:User){
    this.auth.storeUser(user);
  }

}
