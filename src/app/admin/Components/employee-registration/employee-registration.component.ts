import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  roles:string[]=["Physician", "Nurse", "Admin"];
  constructor() { }

  ngOnInit(): void {
    
  }
  public empRegistrationForm = new FormGroup({
    title : new FormControl("",Validators.required),
    fname : new FormControl("",[Validators.required,Validators.minLength(2)]),
    lname : new FormControl("",[Validators.required,Validators.minLength(2)]),
    email : new FormControl("",Validators.email),
    dob : new FormControl("",Validators.required),
    role : new FormControl("",Validators.required),
    specialty : new FormControl("",Validators.required)

})

}
