import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { UserdashboardComponent } from './userdashboard/userdashboard.component'
import { UserService } from './user.service';
import { GetusersComponent } from './getusers/getusers.component';
import {AuthorizationService} from '../app/authorization.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AboutusComponent,
    UserdashboardComponent,
    GetusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
   providers: [ {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthorizationService,
       multi: true,
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
