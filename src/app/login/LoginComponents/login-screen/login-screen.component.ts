import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

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

  constructor(private router: Router)
  {

  }
  onSubmit() 
  {
    this.submitted = true;
    if (this.loginform.invalid) {
        return;
    }
    console.log(this.loginform.controls.email);
    if(this.loginform.controls.email.value=="admin@gmail.com" && this.loginform.controls.password.value == "admin123")
    {

      this.router.navigateByUrl('login/login-passed');
      alert('Login SUCCESS!! ')
    }
    else{
      alert('Incorrect UserId or Password!!')
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
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

}
