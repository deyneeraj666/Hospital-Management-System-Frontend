import { PatientRoleUserPipe } from "./../Shared/patient-role-user.pipe";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './Components/admin-header/admin-header.component';
import { EmployeeRegistrationComponent } from './Components/employee-registration/employee-registration.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { PatientListComponent } from './Components/patient-list/patient-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatTableModule } from "@angular/material/table";
import {MatSortModule} from '@angular/material/sort';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmpRoleUserPipe } from "../shared/emp-role-user.pipe";


@NgModule({
  declarations: [
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent,
    EmpRegistrationComponent,
    ConfirmDialogComponent,
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
    FormsModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatDialogModule,
    MatTooltipModule
    
    
  ],
 
  exports:[
    AdminHeaderComponent,
    EmployeeRegistrationComponent,
    EmployeeListComponent,
    PatientListComponent,
    EmpRegistrationComponent
  ],
  providers: [PatientRoleUserPipe,EmpRoleUserPipe],
  entryComponents:[EmpRegistrationComponent,ConfirmDialogComponent]
})
export class AdminModule { }
