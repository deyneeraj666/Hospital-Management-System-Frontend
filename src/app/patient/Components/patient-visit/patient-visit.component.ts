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


@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css'],
  providers:[DatePipe]
})
export class PatientVisitComponent implements OnInit {
  option: number = 9;
  pid: string = '';
  visitsArray: PatientVisit[] = [];
  dataSource?: any;
  

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentDataService,
    private auth: AuthService,
    private date:DatePipe,
    private pmsService: PmsService
  ) {}

  ngOnInit(): void {
    this.pid = this.auth.Id;

    this.appointmentService
      .getPatientAppointmentByPatientId(this.pid)
      .subscribe(
        (res: any) => {
          let newData = res.map((i: any) => {
            return {
              visitId: i.id,
              visitTitle:i.meetingTitle,
              visitDesc: i.description,
              physician: i.physician,
              date: this.date.transform(i.startDateTime,'dd-MM-yyyy'),
              // status: i.status,
            };
          });
          newData.forEach((item:any,index:any,arr:any)=>{
              item.displayVisitId=index+1
              arr[index]=item;
            });

          this.visitsArray = newData;
          
          this.dataSource = new MatTableDataSource<PatientVisit>(
            this.visitsArray
          );
        },
        (err) => {console.log(err);
        }
      );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  openDialog(apptId: number) {
    this.pmsService.getVitalDetailsByAppointmentId(apptId).subscribe(
      (data) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = data;
        this.dialog.open(VisitDialogComponent, dialogConfig);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
