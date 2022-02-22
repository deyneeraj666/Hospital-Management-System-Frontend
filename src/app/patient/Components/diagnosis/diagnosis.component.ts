import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnosis } from 'src/app/Models/Diagnosis';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  option:number=6;
  constructor() { }
  public data:Diagnosis[]=[];
  
  public dcode:string="";
  public dname:string="";
  public ddate:Date=new Date();
  public isDataNotfound:boolean=false;
  dataSource = new MatTableDataSource<Diagnosis>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  public btn_Add(){
    let newData:Diagnosis=new Diagnosis();
    newData.dcode=this.dcode;
    newData.dname=this.dname;
    newData.ddate=this.ddate;
    //alert(this.ddate);
    this.data.push(newData);
    this.dcode="";
    this.dname="";
    // this.dataSource.data.push(newData);
    // console.log(this.dataSource.data);
    // this.dataSource.paginator = this.paginator;
    // /this.toastr.success('Porcedure Added Successfully !')
  }
  public btn_Cancel(){
    this.dcode="";
    this.dname="";
    //this.ddate=new Date();
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
const ELEMENT_DATA: Diagnosis[]= [
  {dcode: "22.1", dname: 'Fever', ddate:new Date()},
  {dcode:"111.2", dname: 'Cough', ddate: new Date() },
 
 
 ];
