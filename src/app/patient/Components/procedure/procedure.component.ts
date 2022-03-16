import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn,  Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { Procedure_Service } from 'src/app/Service/procedure.service';
import { AuthService } from 'src/app/Shared/auth.service';
@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent  implements OnInit {
  option:number=7;
  constructor(private toastr:ToastrService, private procService: Procedure_Service,private auth: AuthService) { }
  public ProcedureName:string='';
  public ProcedureCode:string='';
  public pid: string = '';
  id:number=4;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
 
  
  public ProcedureGroup=new FormGroup({
    ProcedureName : new FormControl("", [
      Validators.required
    ]),
    ProcedureCode : new FormControl("", [
      Validators.required
   ]),
  })
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getProc();
    this.pid = this.auth.Id;
  } 
getProc() {
  this.procService.getprocedure();
}
  btnadd_click()
  {
    this.procService
      .Procedure(this.ProcedureGroup.value,this.pid)
      .subscribe(
        (res) => {
          console.log(res);
          this.ProcedureGroup.reset();
        },
        (err) => {
          console.log('Error occurred ', err);
          
        }
      );
    this.toastr.success('Procedure Added Successfully !')
  }
  btncancel_click()
  {
    // this.procedure.reset();
    // this.code.reset();
    this.ProcedureGroup.reset();
  }
  deleteproduct_click(index:number){
  // this.ProcedureGroup.
  this.dataSource.data.splice(index,1);
  }
 
  displayedColumns: string[] = ['code', 'name', 'date'];
}
// const ELEMENT_DATA: PeriodicElement[] =[];
const ELEMENT_DATA: PeriodicElement[]= [
  {ProcedureCode: 1, ProcedureName: 'Hydrogen', Date:new Date()},
  {ProcedureCode: 2, ProcedureName: 'Helium', Date: new Date() },
  {ProcedureCode: 3, ProcedureName: 'Lithium', Date:new Date()}
 
 ];
export interface PeriodicElement {
  ProcedureName: string;
  ProcedureCode: number;
  Date: Date;
}

