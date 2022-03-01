import { Component, OnInit, ViewChild } from '@angular/core';
import { View, EventSettingsModel, EventRenderedArgs, ScheduleComponent, ActionEventArgs, PopupCloseEventArgs, PopupOpenEventArgs, EventClickArgs, CellClickEventArgs } from '@syncfusion/ej2-angular-schedule';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { L10n } from '@syncfusion/ej2-base';
import { AppointmentDataService } from 'src/app/Service/appointment-data.service';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/auth.service';

L10n.load({
  'en-US': {
    'schedule': {
      'newEvent': 'New Appointment', //to change the name of the New Event to New Appointment we use L10n class
      'editEvent': 'Edit Appointment'

    }
  }
});
@Component({
  selector: 'app-nurse-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  option: number = 1;
  constructor(private auth:AuthService,private objAppointmentDataService: AppointmentDataService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetAppointment();
    //this.GetAllPhysician();
  }
  CurrentUser: string = this.auth.Id;
  ddlPhysicianData: string[] = [];
  AppointmentData: any[] = []
  tempAppointmentdata: any[] = [];
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent | undefined;

  @ViewChild('filterDropdown')
  public filterDropdownObj: DropDownList | undefined;

  public eventSettings: EventSettingsModel = { dataSource: extend([], this.AppointmentData, undefined, true) as Record<string, any>[] };
  public selectedDate: Date = new Date(2022, 1, 10);
  //public selectedDate: Date = new Date();
  public showQuickInfo = false;
  public startDate !: Date | null;
  public endDate !: Date | null;
  public statusData: string[] = ['New', 'Requested', 'Confirmed'];
  public physicianData: string[] = []
  public startDateParser(data: string) {
    if (this.startDate != null && isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (this.startDate != null && !isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    else {
      return new Date(data);
    }
  }
  public endDateParser(data: string) {
    if (this.endDate != null && isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (this.endDate != null && !isNullOrUndefined(this.endDate != null && this.endDate)) {
      return new Date(this.endDate);
    }
    else {
      return new Date(data);
    }
  }
  public onDateChange(args: ChangeEventArgs): void {
    if (args != null && args != undefined && args.event != undefined) {
      if (args.element.id === "StartTime") {
        this.startDate != args.value;
      } else if (args.element.id === "EndTime") {
        this.endDate != args.value;
      }
    }
  }
  public onPopupOpen(args: PopupOpenEventArgs) {
    this.GetAllPhysician();
  }
  public onPopupClose(args: PopupCloseEventArgs) {
    this.startDate = null;
    this.endDate = null;
    const ids = this.AppointmentData.map(x => x.Id);
    const maxId = Math.max(...ids)
    let tempId = maxId + 1;
    if ((args.type === 'Editor' || args.type === 'DeleteAlert') && args.data != undefined && !isNullOrUndefined(args.data)) {
      let element = ((args.data) as { [key: string]: Object });
      let obj = {
        "Id": (element['Id'] != undefined ? element['Id'] : tempId.toString()), "PatientName": element['Subject'],
        "UserName": this.CurrentUser,
        "Physician": element['Physician'],
        "MeetingTitle": element['MeetingTitle'], "Status": element['Status'], "StartTime": element['StartTime']
        , "EndTime": element['EndTime'], "Description": element['Description']
      }
      if (args != undefined && args.event != undefined && args.event.target != undefined && (args.event.target as HTMLElement).innerText !== 'CANCEL') {
        if (args.type === 'Editor') {
          if (!isNullOrUndefined(obj.Id)) {
            if (this.existingAppointment(Number(obj.Id))) {
              this.UpdateAppointment(obj);
            }
            else {
              this.SaveAppointment(obj)
            }
          }
          if (this.scheduleObj != null && !(this.scheduleObj.eventWindow as any).isCrudAction) {
            this.toastr.info('You just click on Cancel/close button !')
          }
        }
        else if (args.type === 'DeleteAlert') {
          this.DeleteAppointment(Number(obj.Id));
        } else {
          this.ddlPhysicianData = this.filterPhysician(this.AppointmentData)
          this.tempAppointmentdata = this.AppointmentData;
        }
      }

    }
  }
  existingAppointment(Id: Number): boolean {
    let exist: boolean = false;
    let index = this.AppointmentData.findIndex(x => x.Id == Id);
    if (index >= 0) {
      exist = true;
    }
    return exist;
  }
  filterByName() {

    this.filterDropdownObj?.refresh();
    let value = this.filterDropdownObj?.value;
    this.tempAppointmentdata = this.AppointmentData.filter(x => x.Physician == value);
    if (this.scheduleObj != undefined) {
      this.scheduleObj.eventSettings.dataSource = this.tempAppointmentdata;
    }
    else {
      this.toastr.error('schedule Component undefined !')
    }
  }


  filterPhysician(array: any[]): any[] {

    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.Physician)) {
        map.set(item.Physician, true);
        result.push(item.Physician);
      }
    }
    return result;
  }
  GetAllPhysician() {
    this.objAppointmentDataService.GetAllPhysician().subscribe((result) => {
      
      this.physicianData = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        this.physicianData.push(element)
      }
    });
  }
  GetAppointment() {
    this.objAppointmentDataService.GetAppointment().subscribe((result) => {
      this.AppointmentData = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        this.AppointmentData.push(
          {
            "Id": element.Id, "Subject": isNullOrUndefined(element['PatientName']) ? "Blank" : element['PatientName'],
            "UserName":element.UserName ,
            "Physician": element['Physician'],
            "MeetingTitle": element.MeetingTitle, "Status": element.Status, "StartTime": element.StartTime
            , "EndTime": element.EndTime, "Description": element.Description
          }
        )
      }
      this.ddlPhysicianData = this.filterPhysician(this.AppointmentData)
      this.tempAppointmentdata = this.AppointmentData;
      if (this.scheduleObj != undefined) {
        this.scheduleObj.eventSettings.dataSource = this.AppointmentData;
        this.scheduleObj.refresh();
      } else {
        this.toastr.error('schedule Component undefined !')
      }
    });
  }
  SaveAppointment(objAppointment: any) {
    this.objAppointmentDataService.AddAppointment(objAppointment).subscribe((result) => {
      this.toastr.success('Saved Successfully!')
      this.GetAppointment();
    });
  }
  UpdateAppointment(objAppointment: any) {
    this.objAppointmentDataService.UpdateAppointment(objAppointment).subscribe((result) => {
      this.toastr.success('Updated Successfully!')
      this.GetAppointment();
    });
  }

  DeleteAppointment(id: number) {
    this.objAppointmentDataService.DeleteAppointment(id).subscribe((result) => {
      this.GetAppointment();
    });
  }

  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data['Status']) {
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
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data: Record<string, any> = (args.data instanceof Array ? args.data : []);
      if (data['StartTime'] != undefined && data['EndTime'] != undefined && !this.scheduleObj?.isSlotAvailable(data['StartTime'] as Date, data['EndTime'] as Date)) {
        args.cancel = true;
      }
    }
  }
}
