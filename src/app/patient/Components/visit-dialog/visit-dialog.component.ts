import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisDetailsModel } from 'src/app/Models/DiagnosisModel';
import { MedicationsModel } from 'src/app/Models/MedicationModel';
import { Procedure } from 'src/app/Models/Procedure';

@Component({
  selector: 'app-visit-dialog',
  templateUrl: './visit-dialog.component.html',
  styleUrls: ['./visit-dialog.component.css'],
})
export class VisitDialogComponent implements OnInit {

  diagnosisArray:DiagnosisDetailsModel[]=[];
  procedureArray:Procedure[]=[];
  medicationArray:MedicationsModel[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.patientVitalsForm.controls['height'].disable();
    this.patientVitalsForm.controls['weight'].disable();
    this.patientVitalsForm.controls['bloodPressure'].disable();
    this.patientVitalsForm.controls['bodyTemp'].disable();
    this.patientVitalsForm.controls['respiratoryRate'].disable();

    this.fillPatientVitalDialog();

    this.diagnosisArray= this.data.diagnosisData;
    this.procedureArray=this.data.procedureData;
    this.medicationArray=this.data.medicationData;
  
    
  }

  fillPatientVitalDialog() {
    this.patientVitalsForm.controls['height'].setValue(this.data.vitaldata.height);
    this.patientVitalsForm.controls['weight'].setValue(this.data.vitaldata.weight);
    this.patientVitalsForm.controls['bodyTemp'].setValue(this.data.vitaldata.temperature);
    this.patientVitalsForm.controls['respiratoryRate'].setValue(
      this.data.vitaldata.respiratoryRate
    );
    let bp = `${this.data.vitaldata.systolic}/${this.data.vitaldata.diastolic}`;
    this.patientVitalsForm.controls['bloodPressure'].setValue(bp);
  }

  public patientVitalsForm = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    bloodPressure: new FormControl(''),
    bodyTemp: new FormControl(''),
    respiratoryRate: new FormControl(''),
  });

  // public patientProcedureForm = new FormGroup({
  //   code: new FormControl('PC01'),
  //   desc: new FormControl('Blah Blah'),

  // });
}
