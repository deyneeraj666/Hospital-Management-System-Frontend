import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhysicianGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(){
    let role = localStorage.getItem('Role');
    if(this.auth.isLoggedIn() && role=='physician'){
      return true;
    }
    alert("You don't have physician role !");
    this.router.navigate(['login']);
    return false;
  }
  
}
