import { ToastrService } from "ngx-toastr";
import { UsermanagementService } from "src/app/Shared/usermanagement.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PmsService } from 'src/app/Service/pms.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit 
{
  inputEmail: string = '';
  message: string = '';
  otp:string='';
  newPassword:string='';
  forgotPasswordForm:any= FormGroup;
  otpPasswordForm:any= FormGroup;
  disableOption1=true;
  disableOption2=false;
  constructor(private user: UsermanagementService, private router:Router,private service: PmsService,private toastr:ToastrService)
  {

  }
      ngOnInit()
      {
          this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
          });
          this.otpPasswordForm= new FormGroup({
            otp: new FormControl('',Validators.required),
            newPassword : new FormControl("",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
          });
          
      }

 
      getOtp()
      {
        this.disableOption1=false;
        this.disableOption2=true;
        var obj={
          "email":this.forgotPasswordForm.controls.email.value
        }
        this.user.getOtp_service(obj).subscribe((res:any)=>{
        },(err:any)=>{
          if(err.status == 200)
          {
            this.toastr.success(err.error.text);
          }
          else
          {
            this.toastr.error(err.error);
            this.disableOption1=true;
            this.disableOption2=false;
          }
          
        })
        
      }
      validiateOtp()
      {
        var obj={
          "email":this.forgotPasswordForm.controls.email.value,
          "OTP":this.otpPasswordForm.controls.otp.value,
          "NewPassword":this.otpPasswordForm.controls.newPassword.value
        }
        this.user.validiateOtp_service(obj).subscribe((res:any)=>{
        },(err:any)=>{
          if(err.status == 200)
          {
            this.toastr.success(err.error.text);
            setTimeout(()=>{
              this.router.navigateByUrl('')
            },3000)
            
          }
          else
          {
            this.toastr.warning(err.error);
            
          }
        })
      }
}
