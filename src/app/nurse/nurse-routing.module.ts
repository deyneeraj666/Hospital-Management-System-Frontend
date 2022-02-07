import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { NurseHeaderComponent } from './nurse-header/nurse-header.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'nurse',component:NurseHeaderComponent},
  {path:'nurse/appointment',component:AppointmentComponent},
  {path:'nurse/notes',component:NotesComponent},
  {path:'nurse/profile',component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
