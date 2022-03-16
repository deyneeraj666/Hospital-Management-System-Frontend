import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmpRegistrationComponent } from "../../emp-registration/emp-registration.component";
import { elementAt, interval, of } from "rxjs";
import { UsermanagementService } from "src/app/Shared/usermanagement.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { EmpRoleUserPipe } from "src/app/shared/emp-role-user.pipe";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit
{
 
  
  option:number=1;
  tempData?:any;
  listData?: any ;
  toolTipPosition:any="above"
  displayedColumns: string[] = ['empId','title','firstName','lastName','email', 'phoneNumber', 'dob','role', 'status', 'Action'];

  constructor(private dialog:MatDialog,public user:UsermanagementService,private pipe:EmpRoleUserPipe)
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
    setTimeout(()=>{},3000)
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

