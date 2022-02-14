import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Allergy } from 'src/app/Models/Allergy';
import { PmsService } from 'src/app/Service/pms.service';

@Component({
  selector: 'app-allergy-info',
  templateUrl: './allergy-info.component.html',
  styleUrls: ['./allergy-info.component.css'],
})
export class AllergyInfoComponent implements OnInit {
  allergiesArray: Allergy[] = [];
  allergyTypes: Allergy[] = [];
  allergyNames: Allergy[] = [];
  allergyKnown: boolean = true;
  option: number = 3;

  //to hide the buttons
  isSubmitClicked: boolean = true;
  isEditClicked: boolean = false;
  isCancelClicked: boolean = true;

  constructor(private pmsService: PmsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.allergyTypes = this.pmsService.getAllergy();
  }

  allergyNameChangeHandler(value: string) {
    this.allergyNames = this.pmsService.getAllergyNamesByType(value);
  }

  public patientAllergyForm = new FormGroup({
    knownAllergy: new FormControl(''),
    allergyId: new FormControl(''),
    allergyType: new FormControl(''),
    allergyName: new FormControl(''),
    allergyDesc: new FormControl(''),
    allergyClinicalInfo: new FormControl(''),
    isAllergyFatal: new FormControl(''),
  });

  onSubmit() {
    this.allergiesArray.push(this.patientAllergyForm.value);
    //console.log(this.allergiesArray);

    let result = this.pmsService.saveAllergyInfo(this.patientAllergyForm.value);
    if (result) {
      // alert('Form is successfully submitted');
      this.toastr.success('Successfully Submitted');
      this.disableFormProperties();

      this.isSubmitClicked = !this.isSubmitClicked;
      this.isEditClicked = !this.isEditClicked;
      this.isCancelClicked = !this.isCancelClicked;
    }
  }

  onEdit() {
    this.enableFormProperties();
    this.isSubmitClicked = !this.isSubmitClicked;
    this.isEditClicked = !this.isEditClicked;
    this.isCancelClicked = !this.isCancelClicked;
  }

  onCancel() {
    this.patientAllergyForm.reset();
  }

  disableFormProperties() {
    this.patientAllergyForm.controls['knownAllergy'].disable();
    this.patientAllergyForm.controls['allergyId'].disable();
    this.patientAllergyForm.controls['allergyType'].disable();
    this.patientAllergyForm.controls['allergyName'].disable();
    this.patientAllergyForm.controls['allergyDesc'].disable();
    this.patientAllergyForm.controls['allergyClinicalInfo'].disable();
    this.patientAllergyForm.controls['isAllergyFatal'].disable();
  }

  enableFormProperties() {
    this.patientAllergyForm.controls['knownAllergy'].enable();
    this.patientAllergyForm.controls['allergyId'].enable();
    this.patientAllergyForm.controls['allergyType'].enable();
    this.patientAllergyForm.controls['allergyName'].enable();
    this.patientAllergyForm.controls['allergyDesc'].enable();
    this.patientAllergyForm.controls['allergyClinicalInfo'].enable();
    this.patientAllergyForm.controls['isAllergyFatal'].enable();
  }
}
