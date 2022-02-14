import { Component, OnInit,ViewChild } from '@angular/core';
import { View, EventSettingsModel,EventRenderedArgs, ScheduleComponent, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { L10n } from  '@syncfusion/ej2-base';
import { eventData } from '../data';

L10n.load({
  'en-US':{
    'schedule':{
      'newEvent':'New Appointment', //to change the name of the New Event to New Appointment we use L10n class
      'editEvent' : 'Edit Appointment'

    }
  }
});

@Component({
  selector: 'app-physician--appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  option:number=1;
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent | undefined;
  public eventSettings: EventSettingsModel = { dataSource: extend([], eventData,undefined, true) as Record<string, any>[] };
  public selectedDate: Date = new Date();
  public showQuickInfo = false;
  public  startDate !: Date | null;
  public endDate !: Date | null;
  public statusData: string[] = ['New', 'Requested', 'Confirmed'];

  
  public startDateParser(data: string) {
    if (this.startDate!=null && isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if ( this.startDate!=null && !isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    else{
      return new Date(data);
    }
  }
  public endDateParser(data: string) {
    if (this.endDate!=null && isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (this.endDate!=null && !isNullOrUndefined(this.endDate!=null && this.endDate)) {
      return new Date(this.endDate);
    }
    else{
      return new Date(data);
    }
  }
  public onDateChange(args : ChangeEventArgs): void  {
    if (args!=null && args!=undefined  && args.event!=undefined ) {
      if (args.element.id === "StartTime") {
        this.startDate != args.value;
      } else if (args.element.id === "EndTime") {
        this.endDate != args.value;
      }
    }
  }
  public onPopupClose() {
    this.startDate = null;
    this.endDate =null;
  }

  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data['EventType']) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }
  }

  public onActionBegin(args: ActionEventArgs): void {
    if ( args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data : Record<string, any> = (args.data instanceof Array ? args.data[0] : []);
      if (!this.scheduleObj?.isSlotAvailable(data['StartTime'] as Date, data['EndTime'] as Date)) {
        args.cancel = true;
      }
    }
  }


}
