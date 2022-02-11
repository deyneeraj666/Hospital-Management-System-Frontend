import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Models/Employee';
import { PeriodicElement } from 'src/app/patient/Components/procedure/procedure.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeSearch } from 'src/app/Models/EmployeeSearch';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  option:number=1;
  dataSource: any;
  constructor() { }

  ngOnInit(): void {
  }
  searchedKeyword: string="";

  empData:Employee[]=[{emp_id:1,emp_name:"John",doj:"12/12/21",status:"Active"},
                      {emp_id:2,emp_name:"Joseph",doj:"10/2/11",status:"Blocked"},
                      {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"},
                      {emp_id:4,emp_name:"Ravi",doj:"12/12/21",status:"Active"},
                      {emp_id:5,emp_name:"Hari",doj:"10/2/11",status:"Blocked"},
                      // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"},
                      // {emp_id:1,emp_name:"John",doj:"12/12/21",status:"Active"},
                      // {emp_id:2,emp_name:"Joseph",doj:"10/2/11",status:"Blocked"},
                      // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"}
                   ]

                   //empDetails    
                               
                   btn_search(){
                     alert(this.searchedKeyword);
                   }  
}
// export interface Employee_Details {
//   emp_id:number;
//     emp_name:string;
//     doj:string;
//     status:string;
    
// }
