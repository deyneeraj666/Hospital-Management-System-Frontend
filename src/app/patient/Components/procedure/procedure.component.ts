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
    procedure :this.procedure,
    code:this.code
  })
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  btnadd_click()
  {
    // alert(this.selectedproc + this.selectedcode + (this.procedure.errors!=null && this.procedure.errors['required']? this.procedure.errors['required']:''))
    let obj:any={code: this.id ++ , name: this.selectedproc, date:'23-01-2022'}
    this.dataSource.data.push(obj);
    console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.toastr.success('Porcedure Added Successfully !')
  }
  btncancel_click()
  {
    this.procedure.reset();
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
  {code: 1, name: 'Hydrogen', date:'23-01-2022'},
  {code: 2, name: 'Helium', date: '13-02-2022' },
  {code: 3, name: 'Lithium', date:'16-04-2022'}
 
 ];
export interface PeriodicElement {
  name: string;
  code: number;
  date: string;
}

