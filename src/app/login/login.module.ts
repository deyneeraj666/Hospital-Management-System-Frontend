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

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCard } from '@angular/material/card';


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
    MatIconModule
    
    
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
