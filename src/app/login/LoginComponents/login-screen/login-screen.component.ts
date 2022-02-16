import { UsermanagementService } from "./../../../Shared/usermanagement.service";
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

  constructor(private router: Router, private toastr:ToastrService,private user:UsermanagementService)
  {

  }
  onSubmit() 
  {
    this.submitted = true;


    this.user.login_service(this.loginform.controls.email.value,this.loginform.controls.password.value)
    .subscribe((res:any)=>{
      // console.log(res);
      localStorage.setItem('Token',res.items.token)
      localStorage.setItem('Role',res.items.role)
      console.log('login/'+res.items.role)
      this.router.navigateByUrl('login/'+res.items.role);

    },(err:any)=>{
      this.toastr.error("Email Id or Password is Incorrect!!");
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
