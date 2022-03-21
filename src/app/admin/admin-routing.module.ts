import { AdminGuard } from "./../Shared/admin.guard";
import { PatientListComponent } from "./Components/patient-list/patient-list.component";
import { EmployeeRegistrationComponent } from "./Components/employee-registration/employee-registration.component";
import { EmployeeListComponent } from "./Components/employee-list/employee-list.component";
import { AdminHeaderComponent } from "./Components/admin-header/admin-header.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from "../login/LoginComponents/change-password/change-password.component";
import { StatsComponent } from "./Components/stats/stats.component";



const routes: Routes = [
  {path:'login/admin',component:AdminHeaderComponent,canActivate:[AdminGuard]},
  {path:'admin/employeelist',component:EmployeeListComponent,canActivate:[AdminGuard]},
  {path:'admin/employeeregister',component:EmployeeRegistrationComponent,canActivate:[AdminGuard]},
  {path:'admin/stats',component:StatsComponent,canActivate:[AdminGuard]},
  {path:'admin/patientlist',component:PatientListComponent,canActivate:[AdminGuard]},
  {path:'admin/ChangePassword',component:ChangePasswordComponent,canActivate:[AdminGuard]},
  {path:'**',redirectTo:'LoginScreenComponent'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
