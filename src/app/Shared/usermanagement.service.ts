import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService 
{
  readonly Url_register = 'http://localhost:5517/api/Account/signup';
  readonly Url_login = 'http://localhost:5517/api/Account/login';
  readonly Url_pwd_rest ='http://localhost:5517/api/Account/ChangePassword';
  readonly Url_getotp ='http://localhost:5517/api/Account/SendPasswordResetCode';
  readonly Url_validiateOtp ='http://localhost:5517/api/Account/ResetPassword';
  readonly Url_get_all_user='http://localhost:5517/api/Account/GetAllUsers';
  readonly Url_Unblock_user='http://localhost:5517/api/Account/UnblockUser';
  readonly Url_Block_user='http://localhost:5517/api/Account/BlockUser';
  readonly Url_Delete_user='http://localhost:5517/api/Account/DeleteUser'
  readonly Url_Update_user='http://localhost:5517/api/Account/UpdateUser'
  set:number=1;
  opt:number=1;
  selected_emp:any;
  emp_pat_list:number=1;
  empRegistrationForm:FormGroup;
  user_id:string='';
  constructor(private http:HttpClient)
  {
      this.empRegistrationForm = new FormGroup({
      title : new FormControl("",Validators.required),
      firstName : new FormControl("",[Validators.required,Validators.minLength(2)]),
      lastName: new FormControl("",[Validators.required,Validators.minLength(2)]),
      email : new FormControl("",[Validators.required, Validators.email]),
      dob : new FormControl("",Validators.required),
      phoneNumber: new FormControl("",[Validators.required,Validators.pattern("^([0-9]{1,5})?([7-9][0-9]{9})$")]),
      role : new FormControl("",Validators.required),
      // specility: new FormControl("null",Validators.required)
      })
  }

  login_service(email:string ,password:string):Observable<any> 
  {
    return  this.http.post(this.Url_login,{"Email":email , "Password":password});
  }
  register_service(obj:any):Observable<any> 
  {
    return this.http.post(this.Url_register,obj);
  }
  employee_register_service(obj:any)
  {
    return this.http.post(this.Url_register,obj);
  }
  change_password_service(obj:any):Observable<any>
  {
     return  this.http.post(this.Url_pwd_rest,obj);
  }
  getOtp_service(obj:any)
  {
    return this.http.post(this.Url_getotp,obj);
  }
  validiateOtp_service(obj:any)
  {
    return this.http.post(this.Url_validiateOtp,obj);
  }
  populateForm(row:any)
  {
    this.user_id=row.id;
    row.dob = new Date(row.dob);
    this.empRegistrationForm.setValue(_.omit(row,['empId','accessFailedCount','id','password','status','Action']));
  }
  update_userDetails_service(obj:any)
  {
    //console.log(obj)
    obj.id = this.user_id
    console.log(obj)
    const httpOptions = {headers: new HttpHeaders({'id':this.user_id,'Content-Type':'application/json'})};
    return this.http.put(this.Url_Update_user,obj,httpOptions);
  }
  get_all_user_service()
  {
    return this.http.get(this.Url_get_all_user);
  }
  delete_emp_service(obj:any)
  {
    return this.http.post(this.Url_Delete_user,obj)
  }
  block_emp_service(obj:any)
  {
    return this.http.post(this.Url_Block_user,obj)
  }
  unblock_emp_service(obj:any)
  {
    return this.http.post(this.Url_Unblock_user,obj)
  }

}
