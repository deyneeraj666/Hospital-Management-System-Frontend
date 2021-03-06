import { PhysicianGuard } from "./../Shared/physician.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../login/LoginComponents/change-password/change-password.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { PhysicianHeaderComponent } from './physician-header/physician-header.component';
import { ProfileComponent } from './profile/profile.component';
import { DemographicComponent } from "../patient/Components/demographic/demographic.component";

const routes: Routes = [
  {path:'login/physician',component:PhysicianHeaderComponent,canActivate:[PhysicianGuard]},
  {path:'physician/appointment',component:AppointmentComponent,canActivate:[PhysicianGuard]},
  {path:'physician/notes',component:NotesComponent,canActivate:[PhysicianGuard]},
  {path:'physician/profile',component:ProfileComponent,canActivate:[PhysicianGuard]},
  {path:'physician/ChangePassword',component:ChangePasswordComponent,canActivate:[PhysicianGuard]},
  {path:'physician/PatientDetails',component:DemographicComponent},

  {path:'**',redirectTo:'LoginScreenComponent'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
