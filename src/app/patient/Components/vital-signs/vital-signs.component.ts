import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PmsService } from 'src/app/Service/pms.service';
import { ConsultingService } from 'src/app/Shared/consulting.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css'],
})
export class VitalSignsComponent implements OnInit {
  isEditClicked: boolean = false;
  isSaveClicked: boolean = true;

  option: number = 5;

  pid: string = '';
  apptId: number = 0;

  constructor(
    private toastr: ToastrService,
    private pmsService: PmsService,
    private consultingService: ConsultingService
  ) {}

  ngOnInit(): void {
    this.pid = this.consultingService.consultingPId;
    this.apptId = this.consultingService.consultingApptId;

    this.pmsService.getVitalDetailsByAppointmentId(this.apptId).subscribe(
      (res) => {
        this.fillVitalForm(res);
      },
      (err: any) => {
        console.log('Error occurred');
      }
    );
  }

  fillVitalForm(data: any) {
    this.patientVitalForm.controls['height'].setValue(data?.height);
    this.patientVitalForm.controls['weight'].setValue(data?.weight);
    this.patientVitalForm.controls['temperature'].setValue(data?.temperature);
    this.patientVitalForm.controls['systolic'].setValue(data?.systolic);
    this.patientVitalForm.controls['diastolic'].setValue(data?.diastolic);
    this.patientVitalForm.controls['respiratoryRate'].setValue(
      data?.respiratoryRate
    );

    this.disableFormProperties();
    this.isEditClicked = true;
    this.isSaveClicked = false;
  }

  public patientVitalForm = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    temperature: new FormControl(''),
    systolic: new FormControl(''),
    diastolic: new FormControl(''),
    respiratoryRate: new FormControl(''),
  });

  disableFormProperties() {
    this.patientVitalForm.controls['height'].disable();
    this.patientVitalForm.controls['weight'].disable();
    this.patientVitalForm.controls['temperature'].disable();
    this.patientVitalForm.controls['systolic'].disable();
    this.patientVitalForm.controls['diastolic'].disable();
    this.patientVitalForm.controls['respiratoryRate'].disable();
  }

  enableFormProperties() {
    this.patientVitalForm.controls['height'].enable();
    this.patientVitalForm.controls['weight'].enable();
    this.patientVitalForm.controls['temperature'].enable();
    this.patientVitalForm.controls['systolic'].enable();
    this.patientVitalForm.controls['diastolic'].enable();
    this.patientVitalForm.controls['respiratoryRate'].enable();
  }

  edit_click() {
    this.enableFormProperties();
    this.isEditClicked = false;
    this.isSaveClicked = true;
  }
  save_click() {
    this.pmsService
      .savePatientVitalInfo(this.patientVitalForm.value, this.pid, this.apptId)
      .subscribe(
        (res) => {
          this.toastr.success('Saved Successfully !');
          this.disableFormProperties();
          this.isEditClicked = true;
          this.isSaveClicked = false;
        },
        (err) => {
          console.log('Error occurred ', err);
        }
      );
  }
}
