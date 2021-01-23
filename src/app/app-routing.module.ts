import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { GetusersComponent } from './getusers/getusers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import{ProtectrouteGuard} from "../app/protectroute.guard"


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"user/register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"aboutus",component:AboutusComponent},
  {path:"userdashboard",component:UserdashboardComponent},
  {path:"users",component:GetusersComponent,canActivate:[ProtectrouteGuard]},
  {path:"",redirectTo:"/home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
