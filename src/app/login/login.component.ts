import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AutheticationService} from '../authetication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inject authentication service
  constructor(private as:AutheticationService,private router:Router) { }

  ngOnInit(): void {
  }

  login(ref:NgForm){
    let userCredentialsObject=ref.value;
    console.log(userCredentialsObject);

   //if userType is "user"
   if(userCredentialsObject.userType=="user"){
     this.as.getUserToken(userCredentialsObject).subscribe(
       res=>{

        console.log("res is ",res)
        if(res["status"]=="failed"){
          alert(res["message"])
        }
        else if(res["status"]=="success"){
          //store token in local storage
          localStorage.setItem("token",res["message"]);
          localStorage.setItem("username",res["username"])
          
          //update login status of authentication service
          this.as.userLoginStatus=true;

          //navigate to userdashboard component
            this.router.navigateByUrl("/userdashboard");
        }
        
       },
       err=>{
         console.log("err in user login",err);
       }
     )

   }

   //if userType is "admin"
   if(userCredentialsObject.userType=="admin"){
    this.as.getAdminToken(userCredentialsObject).subscribe(
      res=>{
      
      },
      err=>{
        console.log("err in user login",err);
      }
    )
     
  }

  }
}
