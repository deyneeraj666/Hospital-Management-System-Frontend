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
    var obj={
      "email":this.user.selected_emp.email
    }
    this.user.delete_emp_service(obj).subscribe(()=>{
    },()=>{
      this.toastr.info("Deleted ! " + this.user.selected_emp.firstName)
    });
  }
  block_emp()
  {
    var obj={
      "email":this.user.selected_emp.email
    }
    this.user.block_emp_service(obj).subscribe(()=>{
    },()=>{
      this.toastr.warning("Blocked ! " + this.user.selected_emp.firstName)
    });
    
  }
  unlock_emp()
  {
    var obj={
      "email":this.user.selected_emp.email
    }
    this.user.unblock_emp_service(obj).subscribe(()=>{
    },()=>{
      this.toastr.success("Unblocked ! " + this.user.selected_emp.firstName)
    });
  }
}
