import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn,  Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent  implements OnInit {

  constructor() { }
  selectedproc:string='';
  selectedcode:string=''
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  procedure = new FormControl("", [
    Validators.required
  ]);
 
   code = new FormControl("", [
     Validators.required
  ]);
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  btnadd_click()
  {
    alert(this.selectedproc + this.selectedcode + (this.procedure.errors!=null && this.procedure.errors['required']? this.procedure.errors['required']:''))
  }
  btncancel_click()
  {}
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
  {code: 1, name: 'Hydrogen', date: 1.0079},
  {code: 2, name: 'Helium', date: 4.0026},
  {code: 3, name: 'Lithium', date: 6.941}
 
];
export interface PeriodicElement {
  name: string;
  code: number;
  date: number;
}

