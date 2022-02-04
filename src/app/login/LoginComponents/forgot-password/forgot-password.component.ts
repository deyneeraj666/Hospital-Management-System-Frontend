import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PmsService } from 'src/app/Service/pms.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  inputEmail:string="";
  message:string="";
  //emails:string[]=[];
  constructor(private service:PmsService) { }

  ngOnInit(): void {
  }
  public forgotPasswordForm : FormGroup= new FormGroup({
    email : new FormControl("",[Validators.email,Validators.required])
  });

  otpHandler()
  {
    if(this.service.verifyEmail(this.inputEmail))
    {
      this.message="OTP sent to your Email";
    }
    else{
      this.message="Not a registered email";
    }

    
  }

}
