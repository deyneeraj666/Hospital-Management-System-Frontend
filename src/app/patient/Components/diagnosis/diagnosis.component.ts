import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Diagnosis } from 'src/app/Models/Diagnosis';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  option:number=6;
  constructor() { }
  public data:Diagnosis[]=[];
  ngOnInit(): void {
  }
  public dcode:string="";
  public dname:string="";
  public ddate:Date=new Date();
  public isDataNotfound:boolean=false;
  
  public btn_Add(){
    let newData:Diagnosis=new Diagnosis();
    newData.dcode=this.dcode;
    newData.dname=this.dname;
    newData.ddate=this.ddate;
    //alert(this.ddate);
    this.data.push(newData);
    this.dcode="";
    this.dname="";
  }
  public btn_Cancel(){
    this.dcode="";
    this.dname="";
    //this.ddate=new Date();
  }
}
