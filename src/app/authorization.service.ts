import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

      //check for token
      let token=localStorage.getItem("token");

      //if token is existed
      if(token){

          //add token to header of req object
          let clonedReqObj=req.clone({
            headers:req.headers.set("Authorization","Bearer "+token)
          })
          //forward to next interceptor/backend
       return   next.handle(clonedReqObj)



      }
      //if token is not existed
      else{
        //forward req object to next interceptor/backend
      return  next.handle(req)
      }



   
  }
}
