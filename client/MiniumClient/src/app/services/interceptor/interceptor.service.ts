import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {Router} from "@angular/router"


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    console.log(JSON.stringify(req));
    let authReq;
    if(this.authService.getToken()){
      console.log('yo.')
      authReq = req.clone({
        headers: req.headers.set('Authorization', this.authService.getToken())
          .append('Access-Control-Allow-Origin', '*')
      });
    }else{
      // authReq=req
      console.log('yo.')
      this.router.navigate(['users/login'])
    }
    return next.handle(authReq);
  }


}
