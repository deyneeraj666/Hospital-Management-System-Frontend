import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCard, MatCardModule } from '@angular/material/card';

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
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  exports:[
   LoginScreenComponent,
   RegisterComponent,
   ChangePasswordComponent,
   ForgotPasswordComponent

  ]
})
export class LoginModule { }
