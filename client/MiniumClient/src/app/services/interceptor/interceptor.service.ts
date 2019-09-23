import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', /* here you fetch your jwt */this.getToken())
        .append('Access-Control-Allow-Origin', '*')
    });
    return next.handle(authReq);
  }

  getToken() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.authService.getToken();
  }

}
