import { setTime } from "@syncfusion/ej2-angular-schedule";
import { UsermanagementService } from "src/app/Shared/usermanagement.service";
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  form:any;
  loading1 = false;
  loading2 = false;
  loading3 = false;
  dia_close=true;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,public toastr:ToastrService,public user:UsermanagementService) {
    this.form=user.empRegistrationForm;
   }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
  delete_emp()
  {
    this.loading1=true;
    setTimeout(()=>{
      var obj={
        "email":this.user.selected_emp.email
      }
      this.user.delete_emp_service(obj).subscribe(()=>{
      },()=>{
        this.toastr.info("Deleted ! " + this.user.selected_emp.firstName)
        this.dialogRef.close();
      });
    },10000)
    
  }
  block_emp()
  {
    this.loading2 = true;
    
    setTimeout(()=>{
     
      var obj={
        "email":this.user.selected_emp.email
      }
      this.user.block_emp_service(obj).subscribe(()=>{
      },()=>{
        this.toastr.warning("Blocked ! " + this.user.selected_emp.firstName)
        this.dialogRef.close();
      });
     
    },10000)
    

    
  }
  unlock_emp()
  {
    this.loading3 = true;
    setTimeout(()=>{
      var obj={
        "email":this.user.selected_emp.email
      }
      this.user.unblock_emp_service(obj).subscribe(()=>{
      },()=>{
        this.toastr.success("Unblocked ! " + this.user.selected_emp.firstName)
        this.dialogRef.close();
      });
    },10000)
   
  }
}
