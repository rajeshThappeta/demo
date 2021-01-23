import { Component, Host, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { AutheticationService } from './authetication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 


 constructor(private as:AutheticationService){
  
 }
 
 ngOnInit(){
   this.as.logout();
 }

 
}
