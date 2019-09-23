import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq=req.clone(
      {headers:req.headers.set('Accept-Language','test')}
    );

    return next.handle(authReq).pipe(
      
    )

  }

  constructor() { }
}
