import { HeaderComponent } from "./../Shared/header/header.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { LoginRoutingModule } from './login-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DummysuccessfulloginComponent } from './LoginComponents/dummysuccessfullogin/dummysuccessfullogin.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginScreenComponent,
    HeaderComponent,
    DummysuccessfulloginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    
    
  ],
  exports:[
   LoginScreenComponent,
   RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent

  ]
})
export class LoginModule { }
