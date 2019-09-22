import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authApiUrl = environment.authApiUrl;

  constructor(private http: HttpClient) { }

  public login(body: object) {
    return this.http.post<any>(`${this.authApiUrl}/login`, body)
            .pipe(
              map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
              })
            ).toPromise()
  }

  logout() : void{
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
