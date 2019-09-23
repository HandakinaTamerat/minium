import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/sharedmodules/user.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http:HttpClient,private authService:AuthService) {  }

  register(user:User){
    return this.http.post('/api/register',user);
  }

  storeToken(data){
    this.authService.storeToken(data);
  }

}
