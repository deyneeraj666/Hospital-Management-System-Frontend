import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PmsService } from 'src/app/Service/pms.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.css'],
})
export class DemographicComponent implements OnInit {
  age: number = 0;
  option:number =1;

  isSubmitClicked:boolean=true;
  isEditClicked:boolean=false;
  isCancelClicked:boolean=true;

  constructor(private pmsService: PmsService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.onDobChange();
  }

  onDobChange() {
    let now: any = new Date();
    let userDob: any = new Date(this.patientDemographicForm.get('dob')?.value);
    let ageInMilliseconds: any = Math.abs(now - userDob);
    this.age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); 

    
  }

  //to disable the form on click of Submit button
  disableFormProperties() {
    this.patientDemographicForm.controls['title'].disable();
    this.patientDemographicForm.controls['fname'].disable();
    this.patientDemographicForm.controls['lname'].disable();
    this.patientDemographicForm.controls['dob'].disable();
    this.patientDemographicForm.controls['email'].disable();
    this.patientDemographicForm.controls['gender'].disable();
    this.patientDemographicForm.controls['race'].disable();
    this.patientDemographicForm.controls['ethnicity'].disable();
    this.patientDemographicForm.controls['language'].disable();
    this.patientDemographicForm.controls['address'].disable();
    this.patientDemographicForm.controls['contact'].disable();
  }

  //to enable from on click of edit button
  enableFormProperties() {
    this.patientDemographicForm.controls['title'].enable();
    this.patientDemographicForm.controls['fname'].enable();
    this.patientDemographicForm.controls['lname'].enable();
    this.patientDemographicForm.controls['dob'].enable();
    this.patientDemographicForm.controls['email'].enable();
    this.patientDemographicForm.controls['gender'].enable();
    this.patientDemographicForm.controls['race'].enable();
    this.patientDemographicForm.controls['ethnicity'].enable();
    this.patientDemographicForm.controls['language'].enable();
    this.patientDemographicForm.controls['address'].enable();
    this.patientDemographicForm.controls['contact'].enable();
  }

  onEdit() {
    this.enableFormProperties();
    this.isSubmitClicked=!this.isSubmitClicked;
    this.isEditClicked=!this.isEditClicked;
    this.isCancelClicked=!this.isCancelClicked;
  }

  onSubmit() {
    // console.log("submit called")
    // console.log(this.patientDemographicForm.value)
  
    let result = this.pmsService.savePatientDemographicInfo(
      this.patientDemographicForm.value
    );
    if (result) {
      // alert('Form is successfully submitted');
      this.toastr.success('Successfully Submitted');
      this.disableFormProperties();
      this.isSubmitClicked = !this.isSubmitClicked;
      this.isEditClicked=!this.isEditClicked;
      this.isCancelClicked =!this.isCancelClicked;
    }
  }

  onCancel(){
    this.patientDemographicForm.reset();
  }

  public patientDemographicForm = new FormGroup({
    title: new FormControl('', Validators.required),
    fname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dob: new FormControl('2000-01-01', Validators.required),
    // age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    race: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.required,
    ]),
    ethnicity: new FormControl('', Validators.required),
    language: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.required,
    ]),
    email: new FormControl('', Validators.email),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    ]),
  });
}
