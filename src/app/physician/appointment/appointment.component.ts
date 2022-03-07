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
  CurrentUser: string = this.auth.Email;
  option: number = 1;
  physicians: any[] = [];
  tempPhysicians: any[] = [];
  public statusData: string[] = ['ACCEPTED', 'PENDING'];
  public appointmentData: any[] = [];
  constructor(private auth:AuthService,private objAppointmentDataService: AppointmentDataService,private toastr: ToastrService, private httpClient: HttpClient, public datepipe: DatePipe) {
    
    this.physicians.push({"physicianName":"Dr Singh","physicianId":"PranjalPandey@citiustech.com","Specialization":"Neurology"});
    this.physicians.push({"physicianName":"Dr Rao","physicianId":"Pranjal@citiustech.com","Specialization":"Psychiatry"});
    this.physicians.push({"physicianName":"Dr Singh","physicianId":"PranjalPandey1@citiustech.com","Specialization":"Dermatologists"});
    this.physicians.push({"physicianName":"Dr Pankaj","physicianId":"Pranjal2@citiustech.com","Specialization":"Dermatologists"});
    this.physicians.push({"physicianName":"Dr Bhushan","physicianId":"Pranjal4@citiustech.com","Specialization":"Cardiologist"});
    this.physicians.push({"physicianName":"Dr Pandey","physicianId":"PranjalPandey5@citiustech.com","Specialization":"Psychiatry"});

    // this.getPhysician();
    // debugger;
    // console.log(this.physicians)
    // this.specialization_click();
    // this.getSchedule_click();
  
  }
  ngOnInit(): void {
    this.physicianId.disable();
    this.physicianName.disable();
    // this.getPhysician();
   // this.physicians=this.objAppointmentDataService.GetPhysicianTemp();
    this.specialization_click();
    this.getSchedule_click();
  }
  getPhysician(){
    this.objAppointmentDataService.GetPhysician().subscribe((response: any) => {
      response.forEach((data: any) => {
        this.physicians.push({
          "physicianName": data.physicianName,
          "physicianId": data.physicianId,
          "Specialization": data.Specialization
        })
      }); 
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
          regex: ['^[0-9]*$', 'Number only allowed in this field']
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
  public specialization: FormControl = new FormControl("", Validators.required);
  public physicianName: FormControl = new FormControl("", Validators.required);
  public physicianId: FormControl = new FormControl();
  public physicianDetailForm: FormGroup = new FormGroup({
    specialzation: this.specialization,
    physicianName: this.physicianName
  });

  
  public specialization_click() {
    this.physicianName.enable();
    debugger;
    let filteredPhysicians = this.physicians.filter(data => data.physicianId.toUpperCase() ==this.CurrentUser.toUpperCase());
    if (filteredPhysicians.length == 1) {
      this.physicianId.setValue(filteredPhysicians[0].physicianId);
      this.physicianName.setValue(filteredPhysicians[0].physicianName);
      this.specialization.setValue(filteredPhysicians[0].Specialization);
      this.physicianName.disable();
      this.specialization.disable();
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
      data.Specialization == this.specialization.value
      && data.physicianName == this.physicianName.value);
    this.physicianId.setValue(selectedPhysician[0].physicianId);
  }
  
  public getSchedule_click() {
    this.physicianDetailForm.markAllAsTouched();
    // if (this.physicianDetailForm.valid) {
      this.enableCalendar = false;
      this.objAppointmentDataService.GetAppointment().subscribe((response: any) => {
        console.log(response);
        response.forEach((data: any) => {
          if (data.physician.toUpperCase()==this.CurrentUser.toUpperCase()) {
            this.appointmentData.push({
              "Id": data.id,
              "PatientId": data.p_id,
              "PatientName": data.patientName,
              "Physician": data.physician,
              "Subject": data.meetingTitle,
              "Status": data.status,
              "StartTime": new Date(data.startDateTime),
              "EndTime": new Date(data.endDateTime),
              "Description": data.description,
              "username": data.username
            })
          }
        }); 

        let tempAppointmentdata = this.appointmentData.filter(x => x.Physician.toUpperCase() == this.CurrentUser.toUpperCase());
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
    switch (args.data['Status']) {
      case 'ACCEPTED':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'PENDING':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
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
        console.log(diff);
        console.log(diff / 1200);
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
          console.log(args.data);
          let tempId = 100 + 1;
          let element = ((args.data) as { [key: string]: any });
          let result=this.objAppointmentDataService.patientExistorNot(Number(element[0].PatientId));
          
          console.log("Patient Name : " + element[0].PatientName);
          if (result.PatientExist) {
            let appointment = {
              "id": "0",
              "p_id": element[0].PatientId,
              "patientName": result.PatientName,
              "physician": this.CurrentUser,
              "meetingTitle": element[0].Subject,
              "status": element[0].Status,
              "startDateTime": element[0].StartTime,// this.datepipe.transform(element[0].StartTime, 'yyyy-MM-dd h:mm a'),
              "endDateTime": element[0].EndTime,// this.datepipe.transform(element[0].EndTime, 'yyyy-MM-dd h:mm a'),
              "description": element[0].Description,
              "username": this.CurrentUser

            }

            this.objAppointmentDataService.AddAppointment(appointment).subscribe(response => {
              this.toastr.success("Appointment Created Successfully");
            })
          }
          else{
            this.toastr.error("Patient id is incorret");
          }

        }
        if (args.requestType === 'eventChange') {
          let element = ((args.data) as any);
          let appointment1 = {
            "id": element.Id,
            "p_id": element.PatientId,
            "patientName": element.PatientName,
            "physician": element.Physician,
            "meetingTitle": element.Subject,
            "status": element.Status,
            "startDateTime":element.StartTime,// this.datepipe.transform(element.StartTime, 'yyyy-MM-dd h:mm a'),
            "endDateTime":element.EndTime,// this.datepipe.transform(element.EndTime, 'yyyy-MM-dd h:mm a'),
            "description": element.Description,
            "username": this.CurrentUser
          }
          console.log(appointment1);
          this.objAppointmentDataService.UpdateAppointment(appointment1).subscribe((response) => {
            this.toastr.success("Appointment Edited Successfully");
          })
        }
      }
    }
  }
}