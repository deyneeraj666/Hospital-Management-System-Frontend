import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientVisit } from 'src/app/Models/Visit';
import { AppointmentDataService } from 'src/app/Service/appointment-data.service';
import { AuthService } from 'src/app/Shared/auth.service';
import { DatePipe } from '@angular/common';
import { VisitDialogComponent } from '../visit-dialog/visit-dialog.component';
import { PmsService } from 'src/app/Service/pms.service';
import { ConsultingService } from 'src/app/Shared/consulting.service';
import { MatSort } from '@angular/material/sort';
import { DiagnosisDetailsModel } from 'src/app/Models/DiagnosisModel';
import { Procedure } from 'src/app/Models/Procedure';
import { MedicationsModel } from 'src/app/Models/MedicationModel';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css'],
  providers: [DatePipe],
})
export class PatientVisitComponent implements OnInit {
  option: number = 9;
  pid: string = '';
  visitsArray: PatientVisit[] = [];
  diagnosisArray: DiagnosisDetailsModel[] = [];
  procedureArray:Procedure[]=[];
  medicationArray:MedicationsModel[]=[];
  dataSource?: any;

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentDataService,
    private auth: AuthService,
    private date: DatePipe,
    private pmsService: PmsService,
    private consultingService: ConsultingService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // this.pid = this.auth.Id;
    this.pid =
      this.auth.role === 'Patient'
        ? this.auth.EmpId
        : this.consultingService.consultingPId;

    this.appointmentService
      .getAppointmentsByIdAndStatusConfirmed(this.pid)
      .subscribe(
        (res: any) => {
          let newData = res.map((i: any) => {
            return {
              visitId: i.id,
              visitTitle: i.meetingTitle,
              visitDesc: i.description,
              physician: i.physician,
              date: this.date.transform(i.startDateTime, 'dd-MM-yyyy'),
              // status: i.status,
            };
          });
          newData.forEach((item: any, index: any, arr: any) => {
            item.displayVisitId = index + 1;
            arr[index] = item;
          });

          this.visitsArray = newData;

          this.dataSource = new MatTableDataSource<PatientVisit>(
            this.visitsArray
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  displayedColumns: string[] = [
    'displayVisitId',
    'visitTitle',
    'visitDesc',
    'physician',
    'date',
    // 'status',
    'actions',
  ];

  openDialog(apptId: any) {
    this.fillMedications(apptId);
  }

  fillMedications(apptId: any) {
    this.pmsService.getMedicationDetailsByAppointmentId(apptId).subscribe(
      (medicationData) => {

        let newData = medicationData.map((i: any) => {
          return {
            DrugName: i.drugName,
            Strength: i.strength,
            Frequency:i.frequency,
            Form:i.form,
            Quantity:i.quantity,
            Notes:i.notes
          };
        });
        this.medicationArray = newData;
        this.fillProcedure(apptId);
      },
      (err) => {}
    );
  }


  fillProcedure(apptId: any) {
    this.pmsService.getProcedureDetailsByAppointmentId(apptId).subscribe(
      (procedureData) => {

        let newData = procedureData.map((i: any) => {
          return {
            ProcedureCode: i.procedureCode,
            ProcedureName: i.procedureName,
          };
        });
        this.procedureArray = newData;
        this.filldiagnosis(apptId);
      },
      (err) => {}
    );
  }

  filldiagnosis(apptId: any) {
    this.pmsService.getDiagnosisDetailsByAppointmentId(apptId).subscribe(
      (diagnosisData) => {
        console.log('Diagnosis Data');

        console.log(diagnosisData);
        let newData = diagnosisData.map((i: any) => {
          return {
            diag_code: i.diag_code,
            diag_name: i.diag_name,
          };
        });
        this.diagnosisArray = newData;
        this.fillvital(apptId);
      },
      (err) => {}
    );
  }

  fillvital(apptId: any) {
    this.pmsService.getVitalDetailsByAppointmentId(apptId).subscribe(
      (vitaldata) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          vitaldata,
          diagnosisData: this.diagnosisArray,
          procedureData:this.procedureArray,
          medicationData:this.medicationArray
        };
        this.dialog.open(VisitDialogComponent, dialogConfig);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
