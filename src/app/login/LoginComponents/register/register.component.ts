import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public patientRegisterForm : FormGroup= new FormGroup({
    title : new FormControl("",Validators.required),
    fname : new FormControl("",[Validators.required,Validators.minLength(3)]),
    lname : new FormControl("",[Validators.required,Validators.minLength(3)]),
    email : new FormControl("",Validators.email),
    dateOfBirth : new FormControl("",Validators.required),
    contact : new FormControl("",[Validators.required,Validators.pattern("^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$")]),
    password : new FormControl("",Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")),
    confirmPassword : new FormControl("",[
      Validators.required
    ])
  });
  // confirmEquals(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null =>  
  //       control.value?.toLowerCase() === this. 
  //           ? null : {noMatch: true};
  // }
  

}
