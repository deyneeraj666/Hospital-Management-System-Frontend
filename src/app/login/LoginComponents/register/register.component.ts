import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { ConfirmedValidator } from './confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  
 // form: FormGroup = new FormGroup({});
 //private fb: FormBuilder
 patientRegisterForm:any = FormGroup;
 minDate=new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

  constructor(private toastr:ToastrService) { 
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
  btn_submit(){
    if(this.patientRegisterForm.valid){
      this.toastr.success("Registered Successfully!!!");
      this.patientRegisterForm.reset();
    }
    else{
      this.toastr.error("Form input is not valid!!!");
     
      this.patientRegisterForm.reset();
    }
  }

  


  // confirmEquals(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null =>  
  //       control.value?.toLowerCase() === this. 
  //           ? null : {noMatch: true};
  // }
  // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = group.get('password').value;
  //   let confirmPass = group.get('confirmPassword').value
  //   return pass === confirmPass ? null : { notSame: true }
  // }
  
  btn_reset(){
    this.patientRegisterForm.reset();
    this.toastr.warning("Page Reset!!!");

  }

}
