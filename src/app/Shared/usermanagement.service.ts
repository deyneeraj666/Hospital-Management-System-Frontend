import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService 
{
  readonly Url_register = 'http://localhost:5517/api/Account/signup';
  readonly Url_login = 'http://localhost:5517/api/Account/login';
  readonly Url_pwd_rest ='http://localhost:5517/api/Account/ChangePassword';


  constructor(private http:HttpClient)
  {

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
}
