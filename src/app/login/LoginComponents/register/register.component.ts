import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsermanagementService } from 'src/app/Shared/usermanagement.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  
  
  loading_reg=false;
 patientRegisterForm:any = FormGroup;
 minDate=new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

  constructor(private toastr:ToastrService,private user:UsermanagementService,private router:Router) { 
    this.patientRegisterForm = new FormGroup({
      title : new FormControl("",Validators.required),
      fname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      lname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      email : new FormControl("",[Validators.required, Validators.email]),
      dateOfBirth : new FormControl("",Validators.required),
      contact : new FormControl("",[Validators.required,Validators.pattern("^([0-9]{1,5})?([7-9][0-9]{9})$")]),
      password : new FormControl("",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      confirmPassword : new FormControl("",[
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }
  btn_submit()
  {
    
    
      if(this.patientRegisterForm.valid)
     {
      var obj:any = {
        "Title":this.patientRegisterForm.controls.title.value,
        "FirstName": this.patientRegisterForm.controls.fname.value,
        "LastName": this.patientRegisterForm.controls.lname.value,
        "Email": this.patientRegisterForm.controls.email.value,
        "Dob": this.patientRegisterForm.controls.dateOfBirth.value,
        "PhoneNumber": this.patientRegisterForm.controls.contact.value,
        "Password": this.patientRegisterForm.controls.password.value,
        "Role":"Patient"
         }
      this.user.register_service(obj).subscribe((res:any)=>{
       this.loading_reg=true;
       setTimeout(()=>{
        this.toastr.success("Registration Successfully!!");
        this.loading_reg=false;
        this.patientRegisterForm.reset();
       },3000)
       setTimeout(()=>{
        this.router.navigateByUrl('/login');
       },5000)
       
      },(err:any)=>{
        this.loading_reg=true;
        setTimeout(()=>{
        this.router.navigateByUrl('patient-register');
        this.toastr.error("Email-Id already Exists!");
        this.patientRegisterForm.reset();
        this.loading_reg=false;
        },2000)
      })
      
    }
   
    
  }

  btn_reset(){
    this.patientRegisterForm.reset();
    this.toastr.warning("Form Reset!!!");

  }

}
