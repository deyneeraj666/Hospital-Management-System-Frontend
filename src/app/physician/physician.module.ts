import { SharedModule } from "./../shared/shared.module";
import { NurseModule } from "./../nurse/nurse.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicianRoutingModule } from './physician-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { PhysicianHeaderComponent } from './physician-header/physician-header.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";



@NgModule({
  declarations: [
    AppointmentComponent,
    NotesComponent,
    ProfileComponent,
    PhysicianHeaderComponent
  ],
  imports: [
    CommonModule,
    PhysicianRoutingModule,
    SharedModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
  ],
  exports:[
    AppointmentComponent,
    NotesComponent,
    ProfileComponent,
    PhysicianHeaderComponent
  ]
})
export class PhysicianModule { }
