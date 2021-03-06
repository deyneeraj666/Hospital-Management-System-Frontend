import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
// import { Diag_Service } from 'src/app/Shared/diag.service';

import { AuthService } from 'src/app/Shared/auth.service';

import { DiagnosisDetailsModel } from 'src/app/Models/DiagnosisModel';
import { Diag_Service } from 'src/app/Service/diagnosis.service';
import { ConsultingService } from 'src/app/Shared/consulting.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  //readonly Url = 'http://localhost:12207/api/Diagnosis';
  option:number=6;
  constructor(private diagnosisServide: Diag_Service,
    private auth: AuthService,private consultingService :ConsultingService, private toaster:ToastrService) { }
  public data:DiagnosisDetailsModel[]=[];
  
  public diag_code:string="";
  public diag_name:string="";
  public ddate:Date=new Date();
  public isDataNotfound:boolean=false;
  public pid: string = '';
  public appid:number=0;
  public diagnosisName: any[] = [];
  public diagnosisCode: any[] = [];
  public id:number=0;
  // dataSource = new MatTableDataSource<Diagnosis>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  ngOnInit(): void {
    this.pid = this.consultingService.consultingPId;
    this.appid=this.consultingService.consultingApptId;
        //this.dataSource.paginator = this.paginator;
    //this.pid = this.auth.Id;
    //this.diagnosisCodeChangeHandler();
    
    this.diagnosisServide.getdiagnosis().subscribe(
      (res) => {
       this.diagnosisName = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
        console.log('Error occurred');
      }
    );

      this.refreshGrid(); 
      
  }
  refreshGrid() {
    this.diagnosisServide.getDiagnosisDetailsByPatientId(this.pid).subscribe(
      (res: any) => {
        let newData = res.map((i: any) => {
          return {
            diag_code: i.diag_code,
            diag_name: i.diag_name,
            
          };
        });

        this.data = newData;
      },
      (err) => {}
    );
  }
  // this.diagnosisServide.getDiagnosisDetailsByPatientId(this.pid).subscribe(
    //   (res) => {
    //     console.log('Data is there');
    //     this.fillDiagnosisForm(res);
    //     console.log(res);
    //   },
    //   (err: any) => {
    //     console.log(err);
    //     console.log('Error occurred');
    //   }
    // );
  fillDiagnosisForm(data: any) {
    this.patientDiagnosisTable.controls['diag_code'].setValue(data?.title);
    this.patientDiagnosisTable.controls['diag_name'].setValue(data?.firstName);
    this.patientDiagnosisTable.controls['ddate'].setValue(data?.lastName);
  
  }
  
  public btn_Add(){ 

    this.data.push(this.patientDiagnosisTable.value);
    this.diagnosisServide
      .DiagnosisDetailsModel(this.patientDiagnosisTable.value,this.pid,this.appid)
      .subscribe(
        (res) => {
          console.log(res);
          this.patientDiagnosisTable.reset();
          this.toaster.success("Diagnosis is Added");
        },
        (err) => {
          console.log('Error occurred ', err);
          
        }
      );
  }
  // getDiag() {
  //   this.diagnosisServide.getdiagnosis();
  // }
  public btn_Cancel(){
    // this.dcode="";
    // this.dname="";
    //this.ddate=new Date();
    this.patientDiagnosisTable.reset();
    
  }
  
  public patientDiagnosisTable:FormGroup=new FormGroup({
    diag_code: new FormControl('', [
      Validators.required
    ]),
    diag_name: new FormControl('', [
      Validators.required
    ]),    
  })
  deleteproduct_click(id:number){
    this.data.splice((id+1),1);
    // this.diagnosisServide.deleteDiagDetails(id);
    // if( confirm("Are you sure you want to delete?"))
    // {
    //   this.diagnosisServide.deleteDiagDetails(id).subscribe(
    //     (res) => {
    //       let index: number = this.data.findIndex((x) => x.id == id);
    //       this.data.splice(index, 1);
    //     },
    //     (err) => {
    //       console.log(err);
          
    //     }
    //   );
    // }
  }
  diagnosisCodeChangeHandler(value: string) {
    this.diagnosisServide.getDiagnosisCodeByType(value).subscribe(
      (res: any) => {
        console.log(res);
        this.diagnosisCode = res;
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
