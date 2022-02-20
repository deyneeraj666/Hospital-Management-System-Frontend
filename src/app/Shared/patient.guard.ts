import { AuthService } from "./auth.service";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){}
  
  canActivate( )
  {
    let role = localStorage.getItem('role');
    if(this.auth.isLoggedIn() && role=='patient')
    {
      return true;
    }
    alert("You don't have patient role !");
    this.router.navigate(['login']);
    return false;
  }
  
}
