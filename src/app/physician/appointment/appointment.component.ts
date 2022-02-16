import { Component, OnInit,ViewChild } from '@angular/core';
import { View, EventSettingsModel,EventRenderedArgs, ScheduleComponent, ActionEventArgs, PopupCloseEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { L10n } from  '@syncfusion/ej2-base';
import { eventData } from '../data';
import { AppointmentDataService } from 'src/app/Service/appointment-data.service';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';

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
  constructor(private objAppointmentDataService:AppointmentDataService) { }

  ngOnInit(): void {
    this.GetAppointment();
  }

  ddlPhysicianData: string[] = [];
  AppointmentData:any[]=[]
  tempAppointmentdata: any[] = [];
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent | undefined;

  @ViewChild('filterDropdown')
  public filterDropdownObj: DropDownList | undefined;
  
  public eventSettings: EventSettingsModel = { dataSource: extend([], this.AppointmentData,undefined, true) as Record<string, any>[] };
  public selectedDate: Date = new Date(2022, 1, 10);
  //public selectedDate: Date = new Date();
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
  public onPopupClose(args:PopupCloseEventArgs) {
    this.startDate = null;
    this.endDate =null;
    const ids=this.AppointmentData.map(x=>x.Id);
    const maxId = Math.max(...ids)
    let tempId=maxId+1;
    if ((args.type === 'Editor'  || args.type ===  'DeleteAlert') && args.data!=undefined && !isNullOrUndefined(args.data)) {
      let element=((args.data) as { [key: string]: Object });
      let obj={"Id":(element['Id']!=undefined?element['Id'] :tempId.toString()),"Subject":element['Subject'] , "EventType":element['EventType'],"StartTime":element['StartTime']
      ,"EndTime":element['EndTime'],"Description":element['Description']}
      if( args!=undefined &&  args.event!=undefined &&  args.event.target !=undefined && (args.event.target as HTMLElement).innerText !=='CANCEL')
      {
      if (args.type === 'Editor') {
         this.SaveAppointment(obj)
         
        if (this.scheduleObj !=null && !(this.scheduleObj.eventWindow as any).isCrudAction) {
          alert("You just click on Cancel/close button");
        }
      }
      else if (args.type === 'DeleteAlert') {
        debugger;
        //const ids=this.AppointmentData.filter(x => x.Subject==obj.Id)
        this.DeleteAppointment(Number(obj.Id));
        console.log(args)
        console.log(obj)
      }else{
        this.ddlPhysicianData = this.AppointmentData.map(x=>x.Subject)
          this.tempAppointmentdata = this.AppointmentData;
      }
    }
       
    }
  }
  filterByName() {
    
    this.filterDropdownObj?.refresh();
    let value=this.filterDropdownObj?.value;
    debugger;
    this.tempAppointmentdata = this.AppointmentData.filter(x => x.Subject == value);
    if (this.scheduleObj != undefined) {
      this.scheduleObj.eventSettings.dataSource = this.tempAppointmentdata;
    }
    else {
      alert('schedule Component undefined')
    }
  }
  GetAppointment() {
    this.objAppointmentDataService.GetAppointment().subscribe((result) => {
      this.AppointmentData = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        this.AppointmentData.push(
          {
            "Id": element.Id, "Subject": element.Subject, "EventType": element.EventType, "StartTime": element.StartTime
            , "EndTime": element.EndTime, "Description": element.Description
          }
        )
      }
      this.ddlPhysicianData = this.AppointmentData.map(x=>x.Subject)
      this.tempAppointmentdata = this.AppointmentData;
      if (this.scheduleObj != undefined) {
        this.scheduleObj.eventSettings.dataSource = this.AppointmentData;
        this.scheduleObj.refresh();
      } else {
        alert('schedule Component undefined')
      }
    });
  }
  SaveAppointment(objAppointment:any)
  {
    this.objAppointmentDataService.AddAppointment(objAppointment).subscribe((result)=>{
      alert('Appointment  Saved Successfully')
      this.GetAppointment();
    });
    console.log(this.AppointmentData);
  }

  DeleteAppointment(id:number)
  {
    this.objAppointmentDataService.DeleteAppointment(id).subscribe((result)=>{
      this.GetAppointment();
    });
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
