import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Appointment } from 'src/app/Models/Appointment';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit 
{

  option:number=4;
  constructor(private toastr:ToastrService) { }
  hide = true;
  Speciality = new FormControl("", [Validators.required])
  Physician = new FormControl("", [Validators.required])
  appointmentType = new FormControl("", [Validators.required])
  date = new FormControl("", [Validators.required])
  slot = new FormControl("", [Validators.required])
  btnSubmitDisabled: boolean = false;
  minDate=new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
  isdisablenewappointment=true;


 
  appointmentForm = new FormGroup({
    Speciality: this.Speciality,
    Physician: this.Physician,
    appointmentType:this.appointmentType,
    date:this.date,
    slot:this.slot
  });

  appointmentData:Appointment[]=[];

  requiredValidation() {
    if (this.Speciality.errors != null && (this.Speciality.dirty || this.Speciality.errors['required'])) {
      this.btnSubmitDisabled = true;
    }
    if (this.Physician.errors != null && (this.Physician.dirty || this.Physician.errors['required'])) {
      this.btnSubmitDisabled = true;
    }
    return this.btnSubmitDisabled;
  }
  onSubmit()
  {
   let appObj:Appointment={
     'Speciality':this.appointmentForm.value.Speciality,
     'Physician':this.appointmentForm.value.Physician,
     'appointmentType':this.appointmentForm.value.appointmentType,
     'date':this.appointmentForm.value.date,
     'slot':this.appointmentForm.value.slot
    }
    this.appointmentData.push(appObj);
    this.appointmentForm.reset();
    this.toastr.success('Submit Successfully !');
    this.click_ViewAppointment();
  }
  ngOnInit(): void {

  }
  click_NewAppointment(){
    this.isdisablenewappointment=true;
  }
  click_ViewAppointment(){
    this.isdisablenewappointment=false;
  }
}



