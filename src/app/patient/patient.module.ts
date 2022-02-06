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
import { ReactiveFormsModule } from '@angular/forms';



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
    MedicationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    DemographicComponent,
    EmergencyContactComponent,
    AllergyInfoComponent,
  ]
})
export class PatientModule { }
