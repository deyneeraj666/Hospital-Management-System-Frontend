import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login/LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './login/LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './login/LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/LoginComponents/change-password/change-password.component';

const routes: Routes = [
  // { path: 'login', component: LoginScreenComponent},
  // { path: 'patient-register', component: RegisterComponent},
  // { path: 'forgot-password', component: ForgotPasswordComponent},
  // { path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
