import { UsermanagementService } from "src/app/Shared/usermanagement.service";
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
  selectedLevel:number=0;
  empRegistrationForm:any = FormGroup;

  constructor(private toastr:ToastrService,private user:UsermanagementService) {
    this.empRegistrationForm = new FormGroup({
      title : new FormControl("",Validators.required),
      fname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      lname : new FormControl("",[Validators.required,Validators.minLength(2)]),
      email : new FormControl("",[Validators.required, Validators.email]),
      dob : new FormControl("",Validators.required),
      contact : new FormControl("",[Validators.required,Validators.pattern("^([0-9]{1,5})?([7-9][0-9]{9})$")]),
      role : new FormControl("",Validators.required),
     

      })
     
   }

  
 

  click_reset(){
    this.empRegistrationForm.reset();
    this.toastr.warning("Form Reset");
  }
    click_submit()
    {
      
      if(this.empRegistrationForm.valid)
      {
        var obj:any = {
          "FirstName": this.empRegistrationForm.controls.fname.value,
          "LastName": this.empRegistrationForm.controls.lname.value,
          "Email": this.empRegistrationForm.controls.email.value,
          "Dob": this.empRegistrationForm.controls.dob.value,
          "PhoneNumber": this.empRegistrationForm.controls.contact.value,
          "Password": "Password@123",
          "Role": this.empRegistrationForm.controls.role.value
           }

        this.user.employee_register_service(obj).subscribe((res:any)=>{

          this.toastr.success("User Added!");
          this.empRegistrationForm.reset();
        },(err:any)=>{
          this.toastr.error("Email-Id Already Exists!");
        })
      }
      else{
        this.toastr.error("Field is not valid!");
       
        this.empRegistrationForm.reset();
      }
    }

    ngOnInit(): void {
     
   }
}
