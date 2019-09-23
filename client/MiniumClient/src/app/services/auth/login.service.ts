import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { enviroment as env} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  subscription;
  url=env.authApiUrl;
  constructor(private http:HttpClient,private auth:AuthService) { }

  login(user){
    return this.http.post(`${this.url}/login`,user);
  }

  storeToken(obj){
    this.auth.storeToken(obj);
  }


}
