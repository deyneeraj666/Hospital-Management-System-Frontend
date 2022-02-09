import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/Patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  option:number=3;
  constructor() { }

  ngOnInit(): void {
  }
  patientData:Patient[]=[{patient_id:1,patient_name:"John",date_of_reg:"12/12/21",status:"Active"},
  {patient_id:2,patient_name:"Joseph",date_of_reg:"10/2/11",status:"Blocked"},
  {patient_id:3,patient_name:"Ram",date_of_reg:"19/1/22",status:"InActive"},
  {patient_id:4,patient_name:"Ravi",date_of_reg:"12/12/21",status:"Active"},
  {patient_id:5,patient_name:"Hari",date_of_reg:"10/2/11",status:"Blocked"},
  // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"},
  // {emp_id:1,emp_name:"John",doj:"12/12/21",status:"Active"},
  // {emp_id:2,emp_name:"Joseph",doj:"10/2/11",status:"Blocked"},
  // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"}
]
}
