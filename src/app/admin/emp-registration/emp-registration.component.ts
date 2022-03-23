import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from 'src/app/Shared/usermanagement.service';
import * as _ from 'lodash';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css']
})
export class EmpRegistrationComponent 
{
   selectedLevel:string='';
   empRegistrationForm:any = FormGroup;
   loading= false;
  constructor(private toastr:ToastrService,public user:UsermanagementService,
              public dialogRef: MatDialogRef<EmpRegistrationComponent>) 
  { 
    this.empRegistrationForm=this.user.empRegistrationForm; 
   
  }
  
  

   click_reset()
   {
    this.empRegistrationForm.reset();
    this.toastr.warning("Form Reset");
   }

   click_submit()
   {
     
      if(this.empRegistrationForm.valid)
      {
        this.loading= true;
        if(this.user.set==1)
        {
         
              var obj:any = 
              {
                  "Title":this.empRegistrationForm.controls.title.value,
                  "FirstName": this.empRegistrationForm.controls.firstName.value,
                  "LastName": this.empRegistrationForm.controls.lastName.value,
                  "Email": this.empRegistrationForm.controls.email.value,
                  "Dob": this.empRegistrationForm.controls.dob.value,
                  "PhoneNumber": this.empRegistrationForm.controls.phoneNumber.value,
                  "Password": "Password@123",
                  "Role": this.empRegistrationForm.controls.role.value
              }
             setTimeout(() => {
              this.user.employee_register_service(obj).subscribe((res:any)=>
              {
                this.toastr.success("User Added!");
                this.empRegistrationForm.reset();
                this.onClose();
              },(err:any)=>{
                this.toastr.error("Email-Id Already Exists!");
              })
             }, 3000);
            
        }
        else if(this.user.set == 2)
        {
          var obj:any = 
              {
                  "Title":this.empRegistrationForm.controls.title.value,
                  "FirstName": this.empRegistrationForm.controls.firstName.value,
                  "LastName": this.empRegistrationForm.controls.lastName.value,
                  "Email": this.empRegistrationForm.controls.email.value,
                  "Dob": this.empRegistrationForm.controls.dob.value,
                  "PhoneNumber": this.empRegistrationForm.controls.phoneNumber.value,
                  "Password": "Password@123",
                  "Role": this.empRegistrationForm.controls.role.value
              }
          setTimeout(()=>{
            this.user.update_userDetails_service(obj).subscribe(()=>{
              this.toastr.success("Updated Successfully !");
              this.dialogRef.close();
            },()=>{
              this.toastr.success("Updated Successfully !");
              this.onClose();
            })
          },3000)
          
        }
      }
      else
      {
        this.toastr.error("Field is not valid!");
        this.empRegistrationForm.reset();
      }
    }

    onClose() 
    { 
      this.dialogRef.close();
    }
   
}
