import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(){
    let role = localStorage.getItem('Role');
    if(this.auth.isLoggedIn() && role=='admin'){
      return true;
    }
    alert("You don't have admin role !");
    this.router.navigate(['login']);
    return false;
  }
  
}
