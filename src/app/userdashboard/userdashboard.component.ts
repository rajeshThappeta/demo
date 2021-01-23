import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutheticationService } from '../authetication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  username:string;
  userObj:any;
  constructor(private us:UserService,private as:AutheticationService) { }

  ngOnInit(): void {
    //read usrname from local storage
    this.username=localStorage.getItem("username");

    //get user object
    this.us.getUser(this.username).subscribe(
      res=>{
        this.userObj=res["message"];
      },
      err=>{
        alert("some went wrong");
        console.log(err)
      }
    )
  }

  updateFormStatus=false;

  showUpdateForm(){
    this.updateFormStatus=true;
  }

  saveUpdatedUser(ref:NgForm){
    console.log("test")
    console.log(ref.value);
    let userObj=ref.value;
    this.updateFormStatus=false;
    this.us.updateUser(userObj).subscribe(
      res=>{
        alert("user data updated successfully")
        //relace old user data with last modified data
        this.userObj=res["userObj"]
      },
      err=>{
        console.log(err);
        alert("Error in user update")
      }
    )
  }


  deleteUserProfile(){
    this.us.deletUser(this.userObj.username).subscribe(
      res=>{},
      err=>{}
    )
  }


  userLogout(){
    this.as.logout();
  }
}
