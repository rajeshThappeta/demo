import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



        file:File;
 		     incomingfile(event)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();

  //inject UserService object
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  userRegistration(ref:NgForm){    
    let userObject=ref.value;
    console.log("user object is",userObject);

        //adding image and other data to FormData object
        this.formData.append('photo',this.file,this.file.name);
 
        this.formData.append("userObject",JSON.stringify(userObject))
      
  

    //call createUser() of UserService
    this.us.createUser(this.formData).subscribe(
      res=>{

        console.log("res is ",res["message"])
        alert(res["message"]);//{message:"xxxxxxxxx"}
        //navigate to login component
        this.router.navigateByUrl("/login")
      },
      err=>{
          console.log("err in user creation",err);
          alert("Something wrong in user creation")
      }
    )
  }
}
