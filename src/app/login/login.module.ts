import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports:[
   LoginScreenComponent,
   RegisterComponent,
   ChangePasswordComponent,
   ForgotPasswordComponent

  ]
})
export class LoginModule { }
