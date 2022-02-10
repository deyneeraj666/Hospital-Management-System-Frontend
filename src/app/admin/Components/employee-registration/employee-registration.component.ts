import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {
  option:number=2;
  roles:string[]=["Physician", "Nurse", "Admin"];
  empRegistrationForm:any = FormGroup;

  constructor(private toastr:ToastrService) {
    this.empRegistrationForm = new FormGroup({
      title : new FormControl("",Validators.required),
      fname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      lname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      email : new FormControl("",Validators.email),
      dob : new FormControl("",Validators.required),
      role : new FormControl("",Validators.required),
      specialty : new FormControl("",Validators.required)})
   }

  
 

  click_reset(){
    this.empRegistrationForm.reset();
    this.toastr.warning("Form Reset");
  }
    click_submit()
    {
      console.log(this.empRegistrationForm);
      // console.log(this.empRegistrationForm.controls.title.status == "VALID");
      // console.log(this.empRegistrationForm.controls.fname.status == "VALID");
      // console.log(this.empRegistrationForm.controls.lname.status == "VALID");
      // console.log(this.empRegistrationForm.controls.email.status == "VALID");
      // console.log(this.empRegistrationForm.controls.specilaty);
      // console.log(this.empRegistrationForm.controls.role);
      // console.log(this.empRegistrationForm.controls.dob.status == "VALID");

      // if(this.empRegistrationForm.controls.dob.status == "VALID"
      //   && this.empRegistrationForm.controls.title.status == "VALID"
      //   && this.empRegistrationForm.controls.fname.status == "VALID"
      //   && this.empRegistrationForm.controls.lname.status == "VALID"
      //   && this.empRegistrationForm.controls.email.status == "VALID" 
      //   && this.empRegistrationForm.controls.specialty.status == "VALID"
      //   && this.empRegistrationForm.controls.role.status == "VALID"){
      //     this.toastr.success("Employee Added!");
      //    this.empRegistrationForm.reset();
      //   }
      if(this.empRegistrationForm.valid){
        this.toastr.success("Employee Added!");
        this.empRegistrationForm.reset();
      }
      else{
        this.toastr.error("Field is not valid!");
       
        this.empRegistrationForm.reset();
      }
    }

    ngOnInit(): void {
     
   }
}
