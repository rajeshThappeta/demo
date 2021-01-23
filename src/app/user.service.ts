import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //inject HttpClient obj
  constructor(private hc:HttpClient) { }

  //user registration
  createUser(formDataObj):Observable<any>{
    //http post req
   return this.hc.post("user/register",formDataObj)
  }



  getUser(username:string):Observable<any>{
    //http get req
   return this.hc.get(`/user/read/${username}`)
  }

  //update user profile
  updateUser(userObj):Observable<any>{
   return  this.hc.put("/user/update",userObj)
  }

  //delete user
  deletUser(username:string):Observable<any>{
   return this.hc.delete(`/user/delete/${username}`)
  }

  //get users
  getAllUsers():Observable<any>
  {
    return this.hc.get<any>("/user/users");
  }
}
