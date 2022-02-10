import { PatientHeaderComponent } from "./patient/Components/patient-header/patient-header.component";
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login/LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './login/LoginComponents/register/register.component';
import { ForgotPasswordComponent } from './login/LoginComponents/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/LoginComponents/change-password/change-password.component';
import { VitalSignsComponent } from "./patient/Components/vital-signs/vital-signs.component";
import { AdminHeaderComponent } from "./admin/Components/admin-header/admin-header.component";
import { PhysicianHeaderComponent } from "./physician/physician-header/physician-header.component";
import { NurseHeaderComponent } from "./nurse/nurse-header/nurse-header.component";


const routes: Routes = [
  {path:'',component:LoginScreenComponent},
  {path:'login',component:LoginScreenComponent},
  {path:'patient-header',component:PatientHeaderComponent},
  {path:'admin',component:AdminHeaderComponent},
  {path:'nurse',component:NurseHeaderComponent},
  {path:'physicain',component:PhysicianHeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
