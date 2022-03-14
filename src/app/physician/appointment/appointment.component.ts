import { Component, OnInit,ViewChild } from '@angular/core';
import { View, EventSettingsModel,EventRenderedArgs, ScheduleComponent, ActionEventArgs, PopupCloseEventArgs, PopupOpenEventArgs, EJ2Instance, EventFieldsMapping } from '@syncfusion/ej2-angular-schedule';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { L10n } from  '@syncfusion/ej2-base';
import { eventData } from '../data';
import { AppointmentDataService } from 'src/app/Service/appointment-data.service';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/auth.service';
import {
  FormValidators,
  FormValidator,
  TextBox
} from "@syncfusion/ej2-angular-inputs";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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
  styleUrls: ['./appointment.component.css'],
  providers:[DatePipe]
})
export class AppointmentComponent implements OnInit {
  CurrentUser: string = this.auth.EmpId;
  option: number = 1;
  physicians: any[] = [];
  tempPhysicians: any[] = [];
  public statusData: string[] = ['CONFIRMED', 'PENDING'];
  public appointmentData: any[] = [];
  constructor(private auth:AuthService,private objAppointmentDataService: AppointmentDataService,private toastr: ToastrService, private httpClient: HttpClient, public datepipe: DatePipe) {
  
  }
  ngOnInit(): void {
    this.physicianId.disable();
    this.physicianName.disable();
    this.getPhysician();
  }
  getPhysician(){
    this.objAppointmentDataService.GetPhysician().subscribe((response: any) => {
      response.forEach((data: any) => {
        if(data.role.toUpperCase()=='PHYSICIAN')
        this.physicians.push({
          "physicianName": data.firstName +' '+ data.lastName,
          "physicianId": data.empId
        })
      });
      this.specialization_click();
      this.getAppointment_click(); 
    });
  }
  public getStatus(status: String) {
    if (status == null) {
      return 'PENDING';
    } else {
      return status;
    }
  }


  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;
  public selectedDate: Date = new Date();
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public showQuickInfo: Boolean = false;
  public enableCalendar: boolean = false;
  public eventSettings: EventSettingsModel = {
    dataSource: this.appointmentData,
    fields: {
      subject: { name: 'Subject', validation: { required: true } },
      location: {
        name: 'PatientId', validation: {
          required: true,
          // regex: ['^[0-9]*$', 'Number only allowed in this field']
        }
      },
      description: {
        name: 'Description', validation: {
          required: true, minLength: 5, maxLength: 600
        }
      },
      startTime: { name: 'StartTime', validation: { required: true } },
      endTime: { name: 'EndTime', validation: { required: true } }
    }
  };
  public physicianNameList: String[] = [];
  public physicianName: FormControl = new FormControl("", Validators.required);
  public physicianId: FormControl = new FormControl();
  public physicianDetailForm: FormGroup = new FormGroup({
    physicianName: this.physicianName
  });

  
  public specialization_click() {
    this.physicianName.enable();
    debugger;
    let filteredPhysicians = this.physicians.filter(data => data.physicianId.toUpperCase() ==this.CurrentUser.toUpperCase());
    if (filteredPhysicians.length == 1) {
      this.physicianId.setValue(filteredPhysicians[0].physicianId);
      this.physicianName.setValue(filteredPhysicians[0].physicianName);
      this.physicianName.disable();
    } else {
      this.physicianNameList = [];
      filteredPhysicians.forEach(physician => {
        this.physicianNameList.push(physician.physicianName);
        this.physicianId.setValue("");
        this.physicianName.setValue("");
      })
    }
  }

  public physicianName_click() {
    let selectedPhysician = this.physicians.filter(data =>
       data.physicianName == this.physicianName.value);
    this.physicianId.setValue(selectedPhysician[0].physicianId);
  }
  
  public getAppointment_click() {
    this.physicianDetailForm.markAllAsTouched();
    // if (this.physicianDetailForm.valid) {
      this.enableCalendar = false;
      this.objAppointmentDataService.GetAppointment().subscribe((response: any) => {
        response.forEach((data: any) => {
          if (data.physician.toUpperCase()==this.CurrentUser.toUpperCase()) {
            this.appointmentData.push({
              "Id": data.id,
              "PatientId": data.p_id,
              "PatientName": data.patientName,
              "Physician": data.physician,
              "Subject": data.meetingTitle,
              "Status": data.status.toUpperCase(),
              "StartTime": new Date(data.startDateTime),
              "EndTime": new Date(data.endDateTime),
              "Description": data.description,
              "username": data.username
            })
          }
        }); 

        let tempAppointmentdata = this.appointmentData.filter(x => x.username.toUpperCase() == this.CurrentUser.toUpperCase());
        this.eventSettings.dataSource =tempAppointmentdata;
        this.scheduleObj.refresh();
        if (this.scheduleObj != undefined) {
          this.scheduleObj.eventSettings.dataSource = tempAppointmentdata;
        }
        this.appointmentData = [];
      });
    //}
  }

  public dateParser(data: string) {
    return new Date(data);
  }


  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data['Status'].toUpperCase()) {
      case 'CONFIRMED':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'PENDING':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
    }
  }
  
  onActionBegin(args: ActionEventArgs) {
    
    let data: Record<string, any> | Record<string, any>[] | undefined = args.data;

    if (args.requestType === 'eventRemove') {
      let element = ((args.data) as any);
      this.objAppointmentDataService.DeleteAppointment(Number(element[0].Id)).subscribe(response => {
        this.toastr.success("Appointment Cancelled Successfully");
      })
      return;
    }
    
    if ((args.requestType === 'eventCreate' || args.requestType === 'eventChange') && (<Object[]>args.data).length > 0
      || !isNullOrUndefined(<Object>args.data)) {
      let eventData: any = args.data as any;
      let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
      if (eventField.startTime && eventField.endTime) {
        let startDate: Date = (((<Object[]>args.data).length > 0)
          ? eventData[0][eventField.startTime] : eventData[eventField.startTime]) as Date;
        let endDate: Date = (((<Object[]>args.data).length > 0)
          ? eventData[0][eventField.endTime] : eventData[eventField.endTime]) as Date;
        let diff = endDate.valueOf() - startDate.valueOf();
        let duration = diff / (1000 * 3600);
        if (duration < 0) {
          this.toastr.error("End time cannot be less than Start Time");
          this.scheduleObj.refresh();
          return;
        }
        if (duration > 1) {
          this.toastr.error("Appointment Duration Cannot be More than 1hr");
          this.scheduleObj.refresh();
          return;
        }

        args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
        if (args.cancel) {
          this.toastr.error("Selected time slot is not available");
          return;
        }
        if (args.requestType === 'eventCreate') {
          let tempId = 100 + 1;
          let element = ((args.data) as { [key: string]: any });
          let result:any;
         const data= this.objAppointmentDataService.patientExistorNot(element[0].PatientId);
         data.subscribe((res:any[])=>{
          let data:any=res.filter(x => x.empId == element[0].PatientId.toString() && x.role.toUpperCase() == "PATIENT")
               if (data.length > 0) {
                result= { "PatientExist": true, "PatientName": data[0].firstName +' '+ data[0].lastName }
               } else {
                result= { "PatientExist": false, "PatientName": '' }
               }
            if (result!=undefined && result.PatientExist) {
              let appointment = {
                "id": "0",
                "p_id": element[0].PatientId,
                "patientName": result.PatientName,
                "physician": this.physicianName.value,
                "meetingTitle": element[0].Subject,
                "status": element[0].Status.toUpperCase(),
                "startDateTime": element[0].StartTime,
                "endDateTime": element[0].EndTime,
                "description": element[0].Description,
                "username": this.physicianId.value
              }
  
              this.objAppointmentDataService.AddAppointment(appointment).subscribe(response => {
                this.toastr.success("Appointment Created Successfully");
              })
            }
            else{
              this.getAppointment_click();
              this.toastr.error("Patient id is incorret");
            }
         });

        }
        if (args.requestType === 'eventChange') {
          let element = ((args.data) as any);

          let result: any;
          const data = this.objAppointmentDataService.patientExistorNot(element.PatientId);
          data.subscribe((res: any[]) => {
            let data: any = res.filter(x => x.empId == element.PatientId.toString() && x.role.toUpperCase() == "PATIENT")
            if (data.length > 0) {
              result = { "PatientExist": true, "PatientName": data[0].firstName +' '+  data[0].lastName }
            } else {
              result = { "PatientExist": false, "PatientName": '' }
            }
            let appointment1 = {
              "id": element.Id,
              "p_id": element.PatientId,
              "patientName": result.PatientName,
              "physician": this.physicianId.value,
              "meetingTitle": element.Subject,
              "status": element.Status.toUpperCase(),
              "startDateTime": element.StartTime,
              "endDateTime": element.EndTime,
              "description": element.Description,
              "username": this.physicianId.value
            }
            this.objAppointmentDataService.UpdateAppointment(appointment1).subscribe((response) => {
              this.getAppointment_click();
              this.toastr.success("Appointment Edited Successfully");
            })
          });
        }
      }
    }
  }
}