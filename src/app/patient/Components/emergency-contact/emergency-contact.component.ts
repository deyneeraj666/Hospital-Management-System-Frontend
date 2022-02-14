import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PmsService } from 'src/app/Service/pms.service';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css'],
})
export class EmergencyContactComponent implements OnInit {
  option: number = 2;

  isSubmitClicked: boolean = true;
  isEditClicked: boolean = false;
  isCancelClicked: boolean = true;

  constructor(private pmsService: PmsService, private toastr: ToastrService) {}

  ngOnInit(): void {}
  public patientEmergencyForm = new FormGroup({
    efname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    elname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    relationship: new FormControl(''),
    eemail: new FormControl('', Validators.email),
    econtact: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    ]),
    eaddress: new FormControl(''),
    access: new FormControl(''),
  });

  disableFormProperties() {
    this.patientEmergencyForm.controls['efname'].disable();
    this.patientEmergencyForm.controls['elname'].disable();
    this.patientEmergencyForm.controls['relationship'].disable();
    this.patientEmergencyForm.controls['eemail'].disable();
    this.patientEmergencyForm.controls['econtact'].disable();
    this.patientEmergencyForm.controls['eaddress'].disable();
    this.patientEmergencyForm.controls['access'].disable();
  }

  enableFormProperties() {
    this.patientEmergencyForm.controls['efname'].enable();
    this.patientEmergencyForm.controls['elname'].enable();
    this.patientEmergencyForm.controls['relationship'].enable();
    this.patientEmergencyForm.controls['eemail'].enable();
    this.patientEmergencyForm.controls['econtact'].enable();
    this.patientEmergencyForm.controls['eaddress'].enable();
    this.patientEmergencyForm.controls['access'].enable();
  }

  onEdit() {
    this.enableFormProperties();
    this.isSubmitClicked = !this.isSubmitClicked;
    this.isEditClicked = !this.isEditClicked;
    this.isCancelClicked = !this.isCancelClicked;
  }

  onSubmit() {
    // console.log("submit called")
    // console.log(this.patientDemographicForm.value)

    let result = this.pmsService.savePatientDemographicInfo(
      this.patientEmergencyForm.value
    );
    if (result) {
      // alert('Form is successfully submitted');
      this.toastr.success('Successfully Submitted');
      this.disableFormProperties();
      this.isSubmitClicked = !this.isSubmitClicked;
      this.isEditClicked = !this.isEditClicked;
      this.isCancelClicked = !this.isCancelClicked;
    }
  }

  onCancel() {
    this.patientEmergencyForm.reset();
  }
}
