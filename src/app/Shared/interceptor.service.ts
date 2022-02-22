import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor
{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const Token = localStorage.getItem("token");
    console.log("Hii from interceptor")
    
    let updatedReq:HttpRequest<any> = req.clone({
     setHeaders: {
         Authorization: `Bearer ${Token}`
     }
    });

    // debugger;
    return next.handle(updatedReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        
        console.log(`Error Message from HTTP Interceptor : ${req.url}, StatusCode : ${error.status} `);

       if(error.status === 404)
       {
         console.log("The requested resource could not be found");
       }
       else
       {
         console.log(error.message);
       }


        return throwError(error);
      })
    );

  }
 
  
}
