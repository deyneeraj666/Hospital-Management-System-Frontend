import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PmsService } from 'src/app/Service/pms.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.css'],
})
export class DemographicComponent implements OnInit {
  age: number = 0;
  disableAge:boolean=true;
  option: number = 1;
  pid: string = '';

  isSubmitClicked: boolean = true;
  isEditClicked: boolean = false;
  isCancelClicked: boolean = true;

  constructor(
    private pmsService: PmsService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.pid = this.auth.Id;

    this.pmsService.getDemographicInfoByPatientId(this.pid).subscribe(
      (res) => {
        console.log('Receiving data in demo');
        this.fillDemoForm(res);
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        console.log('Error occurred');
      }
    );

       
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
    this.isSubmitClicked = !this.isSubmitClicked;
    this.isEditClicked = !this.isEditClicked;
    this.isCancelClicked = !this.isCancelClicked;
  }

  onSubmit() {

    this.pmsService
      .savePatientDemographicInfo(this.patientDemographicForm.value,this.pid)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Successfully Submitted');
          this.disableFormProperties();
          this.isSubmitClicked = !this.isSubmitClicked;
          this.isEditClicked = !this.isEditClicked;
          this.isCancelClicked = !this.isCancelClicked;
        },
        (err) => {
          console.log('Error occurred ', err);
        }
      );
  }

  fillDemoForm(data: any) {
    this.patientDemographicForm.controls['title'].setValue(data?.title);
    this.patientDemographicForm.controls['fname'].setValue(data?.firstName);
    this.patientDemographicForm.controls['lname'].setValue(data?.lastName);
    this.patientDemographicForm.controls['dob'].setValue(data?.dob);
    this.onDobChange();
    this.patientDemographicForm.controls['email'].setValue(data?.emailId);
    this.patientDemographicForm.controls['gender'].setValue(data?.gender);
    this.patientDemographicForm.controls['race'].setValue(data?.race);
    this.patientDemographicForm.controls['ethnicity'].setValue(data?.ethnicity);
    this.patientDemographicForm.controls['language'].setValue(
      data?.languagesKnown
    );
    this.patientDemographicForm.controls['address'].setValue(data?.homeAddress);
    this.patientDemographicForm.controls['contact'].setValue(
      data?.contactNumber
    );
    this.disableFormProperties();
    this.isSubmitClicked=false;
    this.isEditClicked=true;
    this.isCancelClicked=false;
  
  }

  onCancel() {
    this.patientDemographicForm.reset();
  }

  public patientDemographicForm = new FormGroup({
    title: new FormControl('', Validators.required),
    fname: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    // contact: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    // ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-9]{1,5})?([7-9][0-9]{9})$'),
    ]),
  });
}
