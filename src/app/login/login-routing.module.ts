import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './LoginComponents/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginScreenComponent},
  { path: 'patient-register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  // { path: 'change-password', component: ChangePasswordComponent}
  { path: '', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
