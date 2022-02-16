import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService 
{

  readonly Url_login = 'https://localhost:44358/api/Token';
  readonly Url_register = 'https://localhost:44358/api/UserRegistration';


  constructor(private http:HttpClient)
  {

  }

  login_service(email:string ,password:string)
  {
    return this.http.post(this.Url_login,{"Email":email , "Password":password});
  }

  register_service(obj:any):Observable<any> 
  {
    return this.http.post(this.Url_register,obj);
  }
  employee_register_service(obj:any)
  {
    return this.http.post(this.Url_register,obj);
  }
}
