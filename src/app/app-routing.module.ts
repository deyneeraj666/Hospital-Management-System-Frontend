import { PatientHeaderComponent } from "./patient/Components/patient-header/patient-header.component";
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login/LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './login/LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './login/LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/LoginComponents/change-password/change-password.component';
import { VitalSignsComponent } from "./patient/Components/vital-signs/vital-signs.component";


const routes: Routes = [
  {path:'login',component:LoginScreenComponent},
  {path:'patient-header',component:PatientHeaderComponent},
  {path:'vital-signs',component:VitalSignsComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
