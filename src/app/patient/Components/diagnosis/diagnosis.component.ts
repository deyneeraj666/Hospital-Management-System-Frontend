import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnosis } from 'src/app/Models/Diagnosis';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
// import { Diag_Service } from 'src/app/Shared/diag.service';

import { AuthService } from 'src/app/Shared/auth.service';
import { Diag_Service } from 'src/app/Service/diagnosis.service';
import { DiagnosisDetailsModel } from 'src/app/Models/DiagnosisModel';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  //readonly Url = 'http://localhost:12207/api/Diagnosis';
  option:number=6;
  constructor(private diagnosisServide: Diag_Service,
    private auth: AuthService) { }
  public data:Diagnosis[]=[];
  
  public dcode:string="";
  public dname:string="";
  public ddate:Date=new Date();
  public isDataNotfound:boolean=false;
  public pid: string = '';
  dataSource = new MatTableDataSource<Diagnosis>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  ngOnInit(): void {
    this.pid = this.auth.Id;
    //this.dataSource.paginator = this.paginator;
    this.pid = this.auth.Id;

    this.diagnosisServide.getDiagnosisDetailsByPatientId(this.pid).subscribe(
      (res) => {
        console.log('Data is there');
        this.fillDiagnosisForm(res);
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        console.log('Error occurred');
      }
    );

       
      
  }
  fillDiagnosisForm(data: any) {
    this.patientDiagnosisTable.controls['dcode'].setValue(data?.title);
    this.patientDiagnosisTable.controls['dname'].setValue(data?.firstName);
    this.patientDiagnosisTable.controls['ddate'].setValue(data?.lastName);
  
  }
  
  public btn_Add(){ 
    this.diagnosisServide
      .DiagnosisDetailsModel(this.patientDiagnosisTable.value,this.pid)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('Error occurred ', err);
          
        }
      );
  }
  getDiag() {
    this.diagnosisServide.getdiagnosis();
  }
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
  deleteproduct_click(index:number){
    this.data.splice(index,1);
  }
}
const ELEMENT_DATA: DiagnosisDetailsModel[]= [
  {pid:"11",diag_code: "22.1", diag_name: 'Fever', ddate:new Date(),AppointmentId:"11"},
  {pid:"12",diag_code:"111.2", diag_name: 'Cough', ddate: new Date(),AppointmentId:"12" },
 ];
