import { SharedModule } from "./../shared/shared.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './Components/admin-header/admin-header.component';
import { EmployeeRegistrationComponent } from './Components/employee-registration/employee-registration.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { PatientListComponent } from './Components/patient-list/patient-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'; 




@NgModule({
  declarations: [
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent
  ]
})
export class AdminModule { }
