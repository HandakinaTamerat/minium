import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    let authReq;
    if(this.authService.getToken()){
      authReq = req.clone({
        headers: req.headers.set('Authorization', this.authService.getToken())
          .append('Access-Control-Allow-Origin', '*')
      });
    }else{
      authReq=req;
    }
    return next.handle(authReq);
  }


}
