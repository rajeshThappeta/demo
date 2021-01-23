import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  users=[];
  constructor(private us:UserService) { }

  ngOnInit(): void {
    this.us.getAllUsers().subscribe(
      res=>{
       if(res["message"]=="Unauthorized access"){
         alert("You are not authorised to access this info")
       }
       if(res["message"]=="Session expired"){
         alert("Session expired...plz relogin to continue")
       }
       else{
         this.users=res["users"]
       }
      },
      err=>{
        alert("something went wrong in reading users");
        console.log(err)
      }
    )
  }

}
