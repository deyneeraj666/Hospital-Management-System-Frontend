import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn,  Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { Procedure } from 'src/app/Models/Procedure';
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
  //ELEMENT_DATA: PeriodicElement[]= [];
  public ProcedureName:string='';
  public ProcedureCode:string='';
  public Date:Date=new Date();
  public pid: string = '';
  public data:Procedure[]=[];
  public procedureName: any[] = [];
  public procedureCode: any[] = [];
  id:number=4;
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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

    this.pid = this.auth.Id;

    this.procService.getprocedure().subscribe(
      (res) => {
       this.procedureName = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
        console.log('Error occurred');
      }
    );
  } 
// getProc() {
//   this.procService.getprocedure();
// }
deleteproduct_click(index:number){
  this.data.splice(index,1);
  //this.ProcedureGroup.deleteDiagDetails(this.auth.Id);
}
  btnadd_click()
  {
    this.data.push(this.ProcedureGroup.value);
    this.procService
      .Procedure(this.ProcedureGroup.value,this.pid)
      .subscribe(
        (res) => {
          console.log(res);
          
        },
        (err) => {
          console.log('Error occurred ', err);
          this.ProcedureGroup.reset();
        }
      );
    
  }
  btncancel_click()
  {
     this.ProcedureGroup.reset();
  }
  
  procedureNameChangeHandler(value: string) {
    this.procService.getProcedureNameByType(value).subscribe(
      (res: any) => {
        console.log(res);
        this.procedureCode = res;
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  
 
 }
}

export interface PeriodicElement {
  ProcedureName: string;
  ProcedureCode: number;
  Date: Date;
}

