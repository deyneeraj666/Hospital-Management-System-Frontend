import { PhysicianGuard } from "./../Shared/physician.guard";
import { NurseGuard } from "./../Shared/nurse.guard";
import { AdminGuard } from "./../Shared/admin.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGuard } from '../Shared/patient.guard';
import { ChangePasswordComponent } from './LoginComponents/change-password/change-password.component';
import { ForgotPasswordComponent } from './LoginComponents/forgot-password/forgot-password.component';
import { LoginScreenComponent } from './LoginComponents/login-screen/login-screen.component';
import { RegisterComponent } from './LoginComponents/register/register.component';



const routes: Routes = [
  { path: '', component: LoginScreenComponent},
  { path: 'patient-register', component: RegisterComponent},
  { path: 'login/admin', loadChildren:()=>import('./../admin/admin.module').then(m=>m.AdminModule),canActivate:[AdminGuard]},
  { path: 'login/nurse', loadChildren:()=>import('./../nurse/nurse.module').then(m=>m.NurseModule),canActivate:[NurseGuard]},
  { path: 'login/physician', loadChildren:()=>import('./../physician/physician.module').then(m=>m.PhysicianModule),canActivate:[PhysicianGuard]},
  { path: 'login/patient', loadChildren:()=>import('./../patient/patient.module').then(m=>m.PatientModule),canActivate:[PatientGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'login/change-password', component: ChangePasswordComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
