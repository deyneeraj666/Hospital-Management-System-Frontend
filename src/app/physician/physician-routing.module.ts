import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../login/LoginComponents/change-password/change-password.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { PhysicianHeaderComponent } from './physician-header/physician-header.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'login/physician',component:PhysicianHeaderComponent},
  {path:'physician/appointment',component:AppointmentComponent},
  {path:'physician/notes',component:NotesComponent},
  {path:'physician/profile',component:ProfileComponent},
  {path:'physician/ChangePassword',component:ChangePasswordComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
