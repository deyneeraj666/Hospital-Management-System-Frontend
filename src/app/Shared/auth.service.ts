import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  helper = new JwtHelperService();
  public decodedToken:any
  UserName:string ="";
  Email:string="";
  Id:string="";
  role:string="";
  EmpId:string="";
  FullName:string="";
  constructor()
  {
    
  }
  // isLoggedIn()
  // {
  //   var token:any = localStorage.getItem('token');
  //   this.decodedToken = this.helper.decodeToken(token);
  //   const isExpired =this. helper.isTokenExpired(token);
  //   this.UserName=this.decodedToken.FirstName;
  //   this.Email = this.decodedToken.Email;
  //   if(isExpired)
  //   {
  //     return false;
  //   }
  //   return !!localStorage.getItem('token');
  // }

  isLoggedIn()  {
    var token:any = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(token);
    const isExpired =this. helper.isTokenExpired(token);
    this.UserName=this.decodedToken.FirstName;
    this.Email = this.decodedToken.Email;
    this.Id=this.decodedToken.Id;
    this.role=this.decodedToken.Role;
    this.EmpId=this.decodedToken.EmpId;
    this.FullName=this.decodedToken.FirstName +' '+ this.decodedToken.LastName;;
    if(isExpired)
    {
      return false;
    }
    return !!localStorage.getItem('token');
  }

}

