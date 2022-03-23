import { ToastrService } from "ngx-toastr"; 
import { UsermanagementService } from "src/app/Shared/usermanagement.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PmsService } from 'src/app/Service/pms.service';
import { Router } from "@angular/router";
import { timer } from 'rxjs';
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
  time:number=60;
  loading_reg=false;
  constructor(private user: UsermanagementService, private router:Router,private toastr:ToastrService)
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
       
        var obj={
          "email":this.forgotPasswordForm.controls.email.value
        }
        this.loading_reg=true;
        this.user.getOtp_service(obj).subscribe((res:any)=>{
        },(err:any)=>{
          if(err.status == 200)
          {
           
            this.toastr.success(err.error.text);
            setTimeout(()=>{
              this.disableOption1=false;
              this.disableOption2=true;
              this.loading_reg=false;
            },1000)
            
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
        this.loading_reg=true;
        var obj={
          "email":this.forgotPasswordForm.controls.email.value,
          "OTP":this.otpPasswordForm.controls.otp.value,
          "NewPassword":this.otpPasswordForm.controls.newPassword.value
        }
       
        this.user.validiateOtp_service(obj).subscribe((res:any)=>{
        },(err:any)=>{
          if(err.status == 200)
          {
            
            setTimeout(()=>{
              this.toastr.success(err.error.text);
              this.router.navigateByUrl('')
            },3000)
            
          }
          else if(err.status == 401){
            this.toastr.error(err.error);
            this.disableOption1=true;
            this.disableOption2=false;
            this.loading_reg=false;
          }
          else
          {
            setTimeout(()=>{
              this.toastr.warning(err.error);
             this.loading_reg=false;
             this.otpPasswordForm.reset();
            },3000)
            
            
          }
        })
      }

      
     
}
