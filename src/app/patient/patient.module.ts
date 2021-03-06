import { SharedModule } from "./../shared/shared.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHeaderComponent } from './Components/patient-header/patient-header.component';
import { DemographicComponent } from './Components/demographic/demographic.component';
import { EmergencyContactComponent } from './Components/emergency-contact/emergency-contact.component';
import { AllergyInfoComponent } from './Components/allergy-info/allergy-info.component';
import { AppointmentComponent } from './Components/appointment/appointment.component';
import { VitalSignsComponent } from './Components/vital-signs/vital-signs.component';
import { ProcedureComponent } from './Components/procedure/procedure.component';
import { DiagnosisComponent } from './Components/diagnosis/diagnosis.component';
import { MedicationsComponent } from './Components/medications/medications.component';
import { AllergyGridComponent } from './Components/allergy-grid/allergy-grid.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PatientRoutingModule } from './patient-routing.module';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from "@angular/material/radio";
import { PatientVisitComponent } from './Components/patient-visit/patient-visit.component';
import { VisitDialogComponent } from './Components/visit-dialog/visit-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";



@NgModule({
  declarations: [
    PatientHeaderComponent,
    DemographicComponent,
    EmergencyContactComponent,
    AllergyInfoComponent,
    AppointmentComponent,
    VitalSignsComponent,
    ProcedureComponent,
    DiagnosisComponent,
    MedicationsComponent,
    AllergyGridComponent,
    PatientVisitComponent,
    VisitDialogComponent
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    PatientRoutingModule,
    MatTableModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatDialogModule
  ],
  exports:[
    PatientHeaderComponent,
    VitalSignsComponent,
    DemographicComponent,
    EmergencyContactComponent,
    AllergyInfoComponent,
    AppointmentComponent,
    ProcedureComponent,
    AllergyGridComponent,
    PatientVisitComponent,
    VisitDialogComponent
  ],
})
export class PatientModule{ }
