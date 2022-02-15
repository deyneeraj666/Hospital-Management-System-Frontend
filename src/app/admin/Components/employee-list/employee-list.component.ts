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
  

  ngOnInit(): void {
  }
  searchedKeyword: any="";
  selectDD:string="";
  empData:any[]=[{Id:1,Name:"John",doj:"12/12/21",status:"Active"},
                      {Id:2,Name:"Joseph",doj:"10/2/11",status:"Blocked"},
                      {Id:3,Name:"Ram",doj:"19/1/22",status:"InActive"},
                      {Id:4,Name:"Ravi",doj:"12/12/21",status:"Active"},
                      {Id:5,Name:"Hari",doj:"10/2/11",status:"Blocked"},
                      // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"},
                      // {emp_id:1,emp_name:"John",doj:"12/12/21",status:"Active"},
                      // {emp_id:2,emp_name:"Joseph",doj:"10/2/11",status:"Blocked"},
                      // {emp_id:3,emp_name:"Ram",doj:"19/1/22",status:"InActive"}
                   ]
                   tempdata:any[]=[];

                   constructor() { 
                    this.tempdata=this.empData;
                }
                   get_Value(){
                    //this.tempdata=this.empData.filter(x=>x.status=="Blocked")
                    let key:string=this.selectDD;
                    let value:string=this.searchedKeyword;
                    this.tempdata=this.empData.filter(x=>x[key]==value)
                   }
                   changeDeActivate(index:number){
                    this.empData[index].status="InActive"
                  }
                  changeBlock(index:number){
                   this.empData[index].status="Blocked"
                  }
                  changeActive(index:number){
                   this.empData[index].status="Active"
                  }
}

