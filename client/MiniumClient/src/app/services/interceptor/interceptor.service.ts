import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment as env} from '../../../environments/environment'
import { Router } from '@angular/router';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  authApi=env.authApiUrl;
  constructor(private authService:AuthService,private route:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    let authReq=req;
    if(this.authService.getToken()){
      console.log('yo.')
      authReq = req.clone({
        headers: req.headers.set('Authorization',  `Bearer ${this.authService.getToken()}`)
          .append('Access-Control-Allow-Origin', '*')
      });
    }
    return next.handle(authReq);
  }


}
