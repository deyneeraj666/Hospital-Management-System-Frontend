import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/Patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  option:number=3;
 
  searchedKeyword: any="";
  selectDD:string="";
  ngOnInit(): void {
  }
  patientData:any[]=[{PatientId:1,PatientName:"John",date_of_reg:"12/12/21",status:"Active"},
  {PatientId:2,PatientName:"Joseph",date_of_reg:"10/2/11",status:"Blocked"},
  {PatientId:3,PatientName:"Ram",date_of_reg:"19/1/22",status:"InActive"},
  {PatientId:4,PatientName:"Ravi",date_of_reg:"12/12/21",status:"Active"},
  {PatientId:5,PatientName:"Hari",date_of_reg:"10/2/11",status:"Blocked"}]
  // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"},
  // {emp_id:1,emp_name:"John",doj:"12/12/21",status:"Active"},
  // {emp_id:2,emp_name:"Joseph",doj:"10/2/11",status:"Blocked"},
  // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"}
      tempdata:any[]=[];

                   constructor() { 
                    this.tempdata=this.patientData;
                }
                   get_Value(){
                    //this.tempdata=this.empData.filter(x=>x.status=="Blocked")
                    let key:string=this.selectDD;
                    let value:string=this.searchedKeyword;
                    this.tempdata=this.patientData.filter(x=>x[key]==value)
                   }

}
