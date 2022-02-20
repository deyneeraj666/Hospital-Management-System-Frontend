import { PhysicianModule } from "./../physician/physician.module";
import { PatientModule } from "./../patient/patient.module";
import { NurseModule } from "./../nurse/nurse.module";
import { AdminModule } from "./../admin/admin.module";
import { SharedModule } from "./../shared/shared.module";
import { HeaderComponent } from "../shared/header/header.component";
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
import { MatIconModule } from "@angular/material/icon";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "../Shared/interceptor.service";
import { ConfirmEqualValidatorDirective } from "./LoginComponents/register/confirmed-validator.directive";
import { UsermanagementService } from "../Shared/usermanagement.service";




@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoginScreenComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    AdminModule,
    NurseModule,
    PhysicianModule,
    PatientModule,
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    
    SharedModule,
    ToastrModule.forRoot(
      {timeOut:3000}
    ),
    
  ],
  
  exports:[
   LoginScreenComponent,
   RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    HttpClientModule

  ],
  providers:[UsermanagementService]
})
export class LoginModule { }
