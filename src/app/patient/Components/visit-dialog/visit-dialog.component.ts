import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-visit-dialog',
  templateUrl: './visit-dialog.component.html',
  styleUrls: ['./visit-dialog.component.css']
})
export class VisitDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.patientVitalsForm.controls['height'].disable();
    this.patientVitalsForm.controls['weight'].disable();
    this.patientVitalsForm.controls['bloodPressure'].disable();
    this.patientVitalsForm.controls['bodyTemp'].disable();
    this.patientVitalsForm.controls['respiratoryRate'].disable();
    this.patientProcedureForm.controls['code'].disable();
    this.patientProcedureForm.controls['desc'].disable();
  
   this.fillPatientVitalDialog();
    
  }

  fillPatientVitalDialog() {
 
    this.patientVitalsForm.controls['height'].setValue(this.data.height);
    this.patientVitalsForm.controls['weight'].setValue(this.data.weight);
    this.patientVitalsForm.controls['bodyTemp'].setValue(this.data.temperature);
    this.patientVitalsForm.controls['respiratoryRate'].setValue(this.data.respiratoryRate);
    let bp=`${this.data.systolic}/${this.data.diastolic}`;
    this.patientVitalsForm.controls['bloodPressure'].setValue(bp);

  }

  public patientVitalsForm = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    bloodPressure: new FormControl(''),
    bodyTemp: new FormControl(''),
    respiratoryRate: new FormControl(''),

});

public patientProcedureForm = new FormGroup({
  code: new FormControl('PC01'),
  desc: new FormControl('Blah Blah'),
  

});
}
