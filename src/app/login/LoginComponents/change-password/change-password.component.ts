import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn,  Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router'
import { UsermanagementService } from "src/app/Shared/usermanagement.service";
import { AuthService } from "src/app/Shared/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  
{
  constructor(private router: Router,private toastr:ToastrService,private user:UsermanagementService,public authService:AuthService )
  {
   
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
    debugger;
      let strData:string='Old Password :'+ this.oldPassword.value +'New Password :'+ this.confirmPassword.value;
      var obj:any=
      {
        "Email": this.authService.Email,
        "Password": this.oldPassword.value,
        "NewPassword":this.confirmPassword.value
      }
    
     
        this.user.change_password_service(obj).subscribe({
          next: (v) => {
                        alert(1)
                        console.log(v); 
                        this.toastr.success("Updated");
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        this.router.navigateByUrl('login') 
                        alert(4) 
                      },
          error: (e) =>
          {
            alert(2)
            console.log(e)
            this.toastr.error(e)
          } ,
          complete: () => {console.info('complete');alert(3)} 
        });  
      // try {
      //   let data: any = this.user.change_password_service(obj);
      //   debugger;
      //   data.subscribe((res: any) => {
      //     debugger;
      //     console.log(res)
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
       
  }

  get passwordValue()
  {
    return this.password.value;
  }
  get confirmPasswordValue()
  {
    return this.confirmPassword.value;
  }

}
