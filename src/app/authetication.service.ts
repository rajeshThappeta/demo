import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  userLoginStatus=false;

  //inject http client object
  constructor(private hc:HttpClient,private router:Router) { }

  //user login
  getUserToken(userCredentialsObject):Observable<any>{
      return this.hc.post("/user/login",userCredentialsObject);
  }

  //admin login
  getAdminToken(userCredentialsObject):Observable<any>{
    return this.hc.post("/admin/login",userCredentialsObject);
}



//logout
logout(){
  //clear local storage
  localStorage.clear();
  //navigate to login page
  this.router.navigateByUrl("/login")
}

}
