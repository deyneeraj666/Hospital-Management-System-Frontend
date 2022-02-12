import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn,  Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  {
  constructor(private router: Router)
  {
    // alert(this.router.url);
  }
  DisabledSubmit:boolean=false;
  UserId:string='CurrentUserName';
  
  oldPassword = new FormControl("", [
    Validators.required,
    Validators.pattern(
      "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
    )
  ]);

  password = new FormControl("", [
    Validators.required,
    Validators.pattern(
      "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
    )
  ]);
  hide = true;
  hide1 = true;
  confirmPassword = new FormControl("", [
    Validators.required,
    this.confirmEquals() ,
  ]); 

  confirmEquals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>  
        control.value?.toLowerCase() === this.passwordValue.toLowerCase() 
            ? null : {noMatch: true};
  }
  
  btnback_click()
  {
    if(this.router.url == "/login/patient/ChangePassword")
    {
      this.router.navigateByUrl('login/patient');
    }
    else if(this.router.url == "/nurse/ChangePassword")
    {
      this.router.navigateByUrl('login/nurse');
    }
    else if(this.router.url == "/physician/ChangePassword")
    {
      this.router.navigateByUrl('login/physician');
    }
    else if(this.router.url == "/admin/ChangePassword")
    {
      this.router.navigateByUrl('login/admin');
    }
  }
  btnSubmitPassowrd_click()
  {
    let strData:string='Old Password :'+ this.oldPassword.value +'New Password :'+ this.confirmPassword.value;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login')
                   
    alert('Successfully Updated')
  }

  get passwordValue() {
    return this.password.value;
  }
  get confirmPasswordValue() {
    return this.confirmPassword.value;
  }

}
