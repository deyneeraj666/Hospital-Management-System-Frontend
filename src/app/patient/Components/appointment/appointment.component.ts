import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Appointment } from 'src/app/Models/Appointment';
import { ToastrService } from "ngx-toastr";
import { HttpClient } from '@angular/common/http';
import { AppointmentDataService } from 'src/app/Service/appointment-data.service';
import { AuthService } from 'src/app/Shared/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [DatePipe]
})
export class AppointmentComponent implements OnInit 
{

  option:number=4;
  currentUser:string=this.auth.EmpId;
  currentUserName:string=this.auth.FullName;
  pid:string=this.auth.Id;
  constructor(private auth:AuthService,private objAppointmentDataService: AppointmentDataService,private httpClient: HttpClient,private toastr:ToastrService,private datePipe: DatePipe) 
  { }
  hide = true;
  Description = new FormControl("", [Validators.required])
  Physician = new FormControl("", [Validators.required])
  appointmentType = new FormControl("", [Validators.required])
  date = new FormControl("", [Validators.required])
  slot = new FormControl("", [Validators.required])
  btnSubmitDisabled: boolean = false;
  minDate=new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
  isdisablenewappointment=true;
  public ddlPhysicianData:any[]=[];

 
  appointmentForm = new FormGroup({
    Description: this.Description,
    Physician: this.Physician,
    appointmentType:this.appointmentType,
    date:this.date,
    slot:this.slot
  });
  
  appointmentData:any[]=[];

  requiredValidation() {
    if (this.Description.errors != null && (this.Description.dirty || this.Description.errors['required'])) {
      this.btnSubmitDisabled = true;
    }
    if (this.Physician.errors != null && (this.Physician.dirty || this.Physician.errors['required'])) {
      this.btnSubmitDisabled = true;
    }
    return this.btnSubmitDisabled;
  }
  onSubmit()
  {
  //  let appObj:Appointment={
  //    'Description':this.appointmentForm.value.Description,
  //    'Physician':this.appointmentForm.value.Physician,
  //    'appointmentType':this.appointmentForm.value.appointmentType,
  //    'date':this.appointmentForm.value.date,
  //    'slot':this.appointmentForm.value.slot
  //   }
    let slot:string=this.appointmentForm.value.slot;
    if (slot != undefined) {
      let slotdata = this.slot.value.split('-');
      let start = slotdata[0];
      let end = slotdata[1].split(' ');
      let startdate: Date = new Date(this.appointmentForm.value.date);
      startdate.setDate(startdate.getDate());
      let enddate: Date = new Date(this.appointmentForm.value.date);
      enddate.setDate(enddate.getDate());
      if (end.length > 1 && end[1].toUpperCase() == 'AM') {
        startdate.setHours(start);
        enddate.setHours(end[0]);
      }
      else {
        startdate.setHours(Number(start) + 12);
        enddate.setHours(Number(end[0]) + 12);
      }
      if (this.ddlPhysicianData != undefined) {

        let ddlSelectedData:any = this.ddlPhysicianData.filter(x => x.physicianId.toUpperCase() == this.appointmentForm.value.Physician.toUpperCase())
        debugger;
        let appObj = {
          "id": "0",
          "p_id": this.currentUser,
          //"p_id": this.pid,
          "patientName": this.currentUserName,
          "physician": ddlSelectedData[0].physicianName,
          "meetingTitle": this.appointmentForm.value.appointmentType,
          "status": 'PENDING',
          "startDateTime": startdate,//this.datePipe.transform(startdate, 'yyyy-MM-dd'),
          "endDateTime": enddate, // this.datePipe.transform(enddate, 'yyyy-MM-dd'),
          "description": this.appointmentForm.value.Description,
          "physicianId": ddlSelectedData[0].physicianId
        }
        this.objAppointmentDataService.AddAppointment(appObj).subscribe(response => {
          this.toastr.success("Submit Successfully !");
        })
      }
      else{
        this.toastr.success("Something went wrong !");
      }
    }
     this.appointmentData=[];
     
    this.appointmentForm.reset();
    this.click_ViewAppointment();
  }
  ngOnInit(): void {
    this.getPhysician();
    this.getSchedule_click();
  }
  getPhysician(){
     this.objAppointmentDataService.GetPhysician().subscribe((response: any) => {
      response.forEach((data: any) => {
        if (data.role.toUpperCase() == 'PHYSICIAN') {
          this.ddlPhysicianData.push({
            "physicianName": data.firstName + ' ' + data.lastName,
            "physicianId": data.empId
          })
        }
      });
    });
  }
  public getSchedule_click() {
    this.appointmentData=[]
      this.objAppointmentDataService.GetAppointment().subscribe((response: any) => {
        console.log(response);
        debugger;
        response.forEach((data: any) => {
          if (data.p_id.toUpperCase()==this.currentUser.toUpperCase()) {
           this.appointmentData.push({
              "id": data.id,
              "p_id": data.p_id,
              "patientName": data.patientName,
              "physician": data.physician,
              "meetingTitle": data.meetingTitle,
              "status": data.status,
              "startDateTime": new Date(data.startDateTime),
              "endDateTime": new Date(data.endDateTime),
              "description": data.description,
              "physicianId": data.physicianId
            })
          }
        }); 
      });
  }
  click_NewAppointment(){
    this.isdisablenewappointment=true;
  }
  click_ViewAppointment(){
    this.isdisablenewappointment=false;
    this.getSchedule_click();
  }
}



