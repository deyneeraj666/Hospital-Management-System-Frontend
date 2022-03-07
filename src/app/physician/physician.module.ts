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
import { RecurrenceEditorModule, ScheduleModule, ScheduleAllModule, DayService, WeekService, WorkWeekService,MonthService,MonthAgendaService, DragAndDropService,ResizeService } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    DropDownListAllModule,
    DateTimePickerModule,
    RecurrenceEditorModule, 
    ScheduleModule,
    ScheduleAllModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
    
  ],
  exports:[
    AppointmentComponent,
    NotesComponent,
    ProfileComponent,
    PhysicianHeaderComponent
  ],
  providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],

})
export class PhysicianModule { }
