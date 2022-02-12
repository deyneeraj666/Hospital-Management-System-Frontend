import { NurseGuard } from "./../Shared/nurse.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../login/LoginComponents/change-password/change-password.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { NurseHeaderComponent } from './nurse-header/nurse-header.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'login/nurse',component:NurseHeaderComponent,canActivate:[NurseGuard]},
  {path:'nurse/appointment',component:AppointmentComponent,canActivate:[NurseGuard]},
  {path:'nurse/notes',component:NotesComponent,canActivate:[NurseGuard]},
  {path:'nurse/profile',component:ProfileComponent,canActivate:[NurseGuard]},
  {path:'nurse/ChangePassword',component:ChangePasswordComponent,canActivate:[NurseGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
