import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/sharedmodules/user.models';
import { AuthService } from './auth.service';
import { environment as env }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url=env.authApiUrl;
  constructor(private http:HttpClient,private authService:AuthService) {  }

  register(user:User){
    return this.http.post(`${this.url}/register`,user);
  }

  storeToken(data){
    this.authService.storeToken(data);
  }

}
