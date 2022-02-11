import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../login/LoginComponents/change-password/change-password.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { NurseHeaderComponent } from './nurse-header/nurse-header.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'login/nurse',component:NurseHeaderComponent},
  {path:'nurse/appointment',component:AppointmentComponent},
  {path:'nurse/notes',component:NotesComponent},
  {path:'nurse/profile',component:ProfileComponent},
  {path:'nurse/ChangePassword',component:ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
