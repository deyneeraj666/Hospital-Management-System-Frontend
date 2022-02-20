import { UsermanagementService } from "./../../../Shared/usermanagement.service";
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { async } from "rxjs";


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

  constructor(private router: Router, private toastr:ToastrService,private user:UsermanagementService)
  {

  }
    onSubmit() 
  {
    this.submitted = true;


    this.user.login_service(this.loginform.controls.email.value, this.loginform.controls.password.value)
    .subscribe( async (res:any)=>
    {
      localStorage.setItem('token', res.items.token)
      localStorage.setItem('role',res.items.role  )
      setTimeout(()=>
      {
              if(res.items.role == "patient")
              {
                 this.router.navigateByUrl('login/'+res.items.role+"/demographic");
              }
              else if(res.items.role == "nurse" ||res.items.role == "physician")
              {
                this.router.navigateByUrl(res.items.role+"/appointment");
              }
              else
              {
                this.router.navigateByUrl(res.items.role+"/employeeregister");
              }
             this.toastr.success("Welcome " +res.items.role);
      },1000);
     
     
   
    },(err:any)=>
      {
      this.toastr.error(err.error);
      this.loginform.reset();
    });
    
    

    
  }


  get passwordInput()
  {
     return this.loginform.get('password');
  }

  register_click(){
    this.router.navigateByUrl('patient-register');
  }

  ngOnInit(): void
  {
    this.loginform = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    });
    
  }

}
