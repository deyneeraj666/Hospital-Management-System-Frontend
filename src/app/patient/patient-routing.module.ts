import { LoginScreenComponent } from "./../login/LoginComponents/login-screen/login-screen.component";
import { AppointmentComponent } from "./Components/appointment/appointment.component";
import { ProcedureComponent } from "./Components/procedure/procedure.component";
import { MedicationsComponent } from "./Components/medications/medications.component";
import { DiagnosisComponent } from "./Components/diagnosis/diagnosis.component";
import { AllergyInfoComponent } from "./Components/allergy-info/allergy-info.component";
import { VitalSignsComponent } from "./Components/vital-signs/vital-signs.component";
import { PatientHeaderComponent } from "./Components/patient-header/patient-header.component";
import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DemographicComponent } from "./Components/demographic/demographic.component";
import { EmergencyContactComponent } from "./Components/emergency-contact/emergency-contact.component";
import { ChangePasswordComponent } from "../login/LoginComponents/change-password/change-password.component";

const routes: Routes = [
    {path:"login/patient", component:PatientHeaderComponent},
    {path:"login/patient/demographic", component:DemographicComponent},
    {path:"login/patient/emergency-contact-Info", component:EmergencyContactComponent},
    {path:"login/patient/vital", component:VitalSignsComponent},
    {path:"login/patient/allergy", component:AllergyInfoComponent},
    {path:"login/patient/diagnosis", component:DiagnosisComponent},
    {path:"login/patient/medications", component:MedicationsComponent},
    {path:"login/patient/procedure", component:ProcedureComponent},
    {path:"login/patient/appointment", component:AppointmentComponent},
    {path:"login/patient/ChangePassword", component:ChangePasswordComponent},
    {path:"login", component:LoginScreenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
