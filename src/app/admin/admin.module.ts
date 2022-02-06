import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './Components/admin-header/admin-header.component';
import { EmployeeRegistrationComponent } from './Components/employee-registration/employee-registration.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { PatientListComponent } from './Components/patient-list/patient-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent
  ]
})
export class AdminModule { }
