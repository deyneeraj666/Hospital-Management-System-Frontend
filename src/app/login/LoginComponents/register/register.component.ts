import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from 'src/app/Shared/usermanagement.service';
//import { ConfirmedValidator } from './confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  
  
 
 patientRegisterForm:any = FormGroup;

  constructor(private toastr:ToastrService,private user:UsermanagementService ) { 
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
        "firstName": this.patientRegisterForm.controls.fname.value,
        "lastName": this.patientRegisterForm.controls.lname.value,
        "email": this.patientRegisterForm.controls.email.value,
        "dob": this.patientRegisterForm.controls.dateOfBirth.value,
        "contact": this.patientRegisterForm.controls.contact.value,
        "password": this.patientRegisterForm.controls.password.value,
        "r_id": 1,
        "tblRoles": null
         }
      this.user.register_service(obj).subscribe((res:any)=>{
        console.log(res)
        this.toastr.success("Registration Successfully!!");
      })
      this.patientRegisterForm.reset();
    }
    else
    {
      this.toastr.error("Form input is not valid!!!");
     
      this.patientRegisterForm.reset();
    }
  }

  btn_reset(){
    this.patientRegisterForm.reset();
    this.toastr.warning("Page Reset!!!");

  }

}
