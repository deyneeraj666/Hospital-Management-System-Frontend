import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn,  Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent  implements OnInit {
  option:number=7;
  constructor(private toastr:ToastrService) { }
  selectedproc:string='';
  selectedcode:string=''

  id:number=4;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  procedure = new FormControl("", [
    Validators.required
  ]);
 
   code = new FormControl("", [
     Validators.required
  ]);

  ProcedureGroup=new FormGroup({
    //procedure :this.procedure,
    procedure : new FormControl("", [
      Validators.required
    ]),
    code : new FormControl("", [
      Validators.required
   ]),
  })
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

//   ProcedureGroup:FormGroup=new FormGroup({
//     diag_code: new FormControl('', [
//       Validators.required
//     ]),
//     diag_name: new FormControl('', [
//       Validators.required
//     ]),    
//   })
//   deleteproduct_click(index:number){
//     this.data.splice(index,1);
//   }
// }
  btnadd_click()
  {
    // alert(this.selectedproc + this.selectedcode + (this.procedure.errors!=null && this.procedure.errors['required']? this.procedure.errors['required']:''))
    let obj:any={code: this.id ++ , name: this.selectedproc, date:new Date()}
    this.dataSource.data.push(obj);
    console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.toastr.success('Procedure Added Successfully !')
  }
  btncancel_click()
  {
    this.procedure.reset();
    this.code.reset();
  }
  deleteproduct_click(index:number){
  // this.ProcedureGroup.
  this.dataSource.data.splice(index,1);
  }
 
  // get procedureValue() {
  //   return this.procedure.value;
  // }
  // get codeValue() {
  //   return this.code.value;
  // }
  
  displayedColumns: string[] = ['code', 'name', 'date'];
}
// const ELEMENT_DATA: PeriodicElement[] =[];
const ELEMENT_DATA: PeriodicElement[]= [
  {code: 1, name: 'Hydrogen', date:new Date()},
  {code: 2, name: 'Helium', date: new Date() },
  {code: 3, name: 'Lithium', date:new Date()}
 
 ];
export interface PeriodicElement {
  name: string;
  code: number;
  date: Date;
}

