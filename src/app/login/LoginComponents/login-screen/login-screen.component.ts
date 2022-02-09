import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit 
{
  hide = true;
  submitted:boolean=false;
  loginform:any = FormGroup ;

  constructor(private router: Router, private toastr:ToastrService)
  {

  }
  onSubmit() 
  {
    this.submitted = true;
    if (this.loginform.invalid) {
        return;
    }
    console.log(this.loginform.controls.email);
    if(this.loginform.controls.email.value=="user@gmail.com" && this.loginform.controls.password.value == "user@123")
    {
      this.router.navigateByUrl('login/patient-header');
      this.toastr.success('Welcome user!')
    }
    else if(this.loginform.controls.email.value=="admin@gmail.com" && this.loginform.controls.password.value == "admin@123")
    {
      this.router.navigateByUrl('login/admin-header');
      this.toastr.success('Welcome Admin!')
    }
    else if(this.loginform.controls.email.value=="nurse@gmail.com" && this.loginform.controls.password.value == "nurse@123")
    {
      this.router.navigateByUrl('login/nurse-header');
      this.toastr.success('Welcome Nurse!')
    }
    else if(this.loginform.controls.email.value=="physician@gmail.com" && this.loginform.controls.password.value == "physician@123")
    {
      this.router.navigateByUrl('login/physician-header');
      this.toastr.success('Welcome Physician!')
    }
    else
    {
      this.toastr.error('Invalid UserId or Password !')
      this.loginform.reset();
    }
  }


  get passwordInput()
  {
     return this.loginform.get('password');
  }

  

  ngOnInit(): void
  {
    this.loginform = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

}
