import { PatientListComponent } from "./Components/patient-list/patient-list.component";
import { EmployeeRegistrationComponent } from "./Components/employee-registration/employee-registration.component";
import { EmployeeListComponent } from "./Components/employee-list/employee-list.component";
import { AdminHeaderComponent } from "./Components/admin-header/admin-header.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from "../login/LoginComponents/change-password/change-password.component";



const routes: Routes = [
  {path:'login/admin',component:AdminHeaderComponent},
  {path:'admin/employeelist',component:EmployeeListComponent},
  {path:'admin/employeeregister',component:EmployeeRegistrationComponent},
  {path:'admin/patientlist',component:PatientListComponent},
  {path:'admin/ChangePassword',component:ChangePasswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
