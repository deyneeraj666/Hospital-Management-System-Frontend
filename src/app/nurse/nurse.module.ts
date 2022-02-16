import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseRoutingModule } from './nurse-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { NurseHeaderComponent } from './nurse-header/nurse-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DayService, DragAndDropService, MonthService, RecurrenceEditorModule, ResizeService, ScheduleAllModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppointmentComponent,
    NotesComponent,
    ProfileComponent,
    NurseHeaderComponent,

  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    SharedModule,
    DropDownListAllModule,
    DateTimePickerModule,
    RecurrenceEditorModule, 
    ScheduleModule,
    ScheduleAllModule,
    HttpClientModule
    
  ],
  exports:[
    AppointmentComponent,
    NotesComponent,
    ProfileComponent,
    NurseHeaderComponent
  ],
  providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
})
export class NurseModule { }
