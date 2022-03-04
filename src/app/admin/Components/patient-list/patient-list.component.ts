import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval } from 'rxjs';
import { Patient } from 'src/app/Models/Patient';
import { PatientRoleUserPipe } from 'src/app/Shared/patient-role-user.pipe';
import { UsermanagementService } from 'src/app/Shared/usermanagement.service';
import { EmpRegistrationComponent } from '../../emp-registration/emp-registration.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent  {
  option:number=3;
  listData?: any ;
  tempData?:any;
  toolTipPosition:any="above"
  displayedColumns: string[] = ['empId','title','firstName','lastName','email', 'phoneNumber', 'dob','role', 'status', 'Action'];
  constructor(private dialog:MatDialog,public user:UsermanagementService,private pipe:PatientRoleUserPipe)
  {
    
  }
 

 
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  searchKey!: string ;

  ngOnInit(): void {

    const obs = interval(8000);
    obs.subscribe(()=>{
      this.user.get_all_user_service().subscribe((res:any)=>
      {
        
        this.tempData = this.pipe.transform(res)
        this.listData = new MatTableDataSource(this.tempData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator
       
       
        
      })
     
    })

    
  }

  applyFilter() 
  {
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  onSearchClear() 
  {
    this.searchKey = "";
    this.applyFilter();
  }

  onCreate()
  {
    this.user.emp_pat_list=2;
    this.user.set=1;
    this.user.empRegistrationForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height="70%";
    dialogConfig.width = "60%";
    this.dialog.open(EmpRegistrationComponent,dialogConfig)
  }

  onEdit(row: any)
  {
   this.user.set=2;
   console.log(row)
   this.user.populateForm(row)
   
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.height="70%";
   dialogConfig.width = "60%";
   this.dialog.open(EmpRegistrationComponent,dialogConfig)
  }
 
  click_delete(row:any)
  {
    this.user.opt=1;
    this.user.selected_emp=row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height="30%";
    dialogConfig.width = "27%";
    this.dialog.open(ConfirmDialogComponent,dialogConfig)
  }
 
  onBlock(row: any)
  {
    this.user.opt=2;
    this.user.selected_emp=row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height="30%";
    dialogConfig.width = "27%";
    this.dialog.open(ConfirmDialogComponent,dialogConfig)
  }

  onUnBlock(row:any)
  {
    this.user.opt=3;
    this.user.selected_emp=row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height="30%";
    dialogConfig.width = "27%";
    this.dialog.open(ConfirmDialogComponent,dialogConfig)
  }
  

}
