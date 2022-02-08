import { PatientHeaderComponent } from "./../patient/Components/patient-header/patient-header.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './LoginComponents/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginScreenComponent},
  { path: 'login/patient-register', component: RegisterComponent},
  { path: 'login/forgot-password', component: ForgotPasswordComponent},
  { path: 'login/change-password', component: ChangePasswordComponent},
  { path: 'login/patient-header', component: PatientHeaderComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
