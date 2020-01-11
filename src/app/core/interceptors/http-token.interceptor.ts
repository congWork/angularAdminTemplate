import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpTokenInterceptor implements HttpInterceptor {
    accessToken: string = '';
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const token = this.accessToken;
      if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
      }
        const authReq = req.clone({ setHeaders: headersConfig });
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                // refresh token
              } else {
                return throwError(error);
              }
            })
          );
    }
}