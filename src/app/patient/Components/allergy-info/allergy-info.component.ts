import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Allergy } from 'src/app/Models/Allergy';
import { PmsService } from 'src/app/Service/pms.service';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-allergy-info',
  templateUrl: './allergy-info.component.html',
  styleUrls: ['./allergy-info.component.css'],
})
export class AllergyInfoComponent implements OnInit {
  allergiesArray: Allergy[] = [];
  allergyTypes: string[] = [];
  allergyNames: string[] = [];

  pid: string = '';
  option: number = 3;

  constructor(
    private pmsService: PmsService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.pid = this.auth.Id;

    this.pmsService.getAllergy().subscribe(
      (res) => {
        this.allergyTypes = res;
        console.log('Data received');
      },
      (err) => {
        console.log(err);
        console.log('Error occurred');
      }
    );
    this.refreshGrid();
  }

  refreshGrid() {
    this.pmsService.getPatientAllergyByPatientId(this.pid).subscribe(
      (res: any) => {
        let newData = res.map((i: any) => {
          return {
            allergyId: i.allergyId,
            allergyType: i.allergy_Type,
            allergyName: i.allergy_Name,
            allergyDesc: i.allergy_Description,
            allergyClinicalInfo: i.allergy_Clinical_Info,
            isAllergyFatal: i.isAllergyFatal,
          };
        });

        this.allergiesArray = newData;
      },
      (err) => {}
    );
  }

  allergyNameChangeHandler(value: string) {

    this.pmsService.getAllergyNamesByType(value).subscribe(
      (res: any) => {
        this.allergyNames = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public patientAllergyForm = new FormGroup({
    knownAllergy: new FormControl('No'),
    allergyId: new FormControl(''),
    allergyType: new FormControl(''),
    allergyName: new FormControl(''),
    allergyDesc: new FormControl(''),
    allergyClinicalInfo: new FormControl(''),
    isAllergyFatal: new FormControl(''),
  });

  onSubmit() {
    if (this.patientAllergyForm.get('knownAllergy')?.value == 'Yes') {
      this.allergiesArray.push(this.patientAllergyForm.value);
    }

    this.pmsService
      .savePatientAllergyInfo(this.patientAllergyForm.value, this.pid)
      .subscribe(
        (res) => {
          this.toastr.success('Successfully Submitted');
          this.patientAllergyForm.reset();
          this.refreshGrid();
        },
        (err) => {
          console.log('Error occurred ', err);
        }
      );
  }

  onCancel() {
    this.patientAllergyForm.reset();
  }


}
