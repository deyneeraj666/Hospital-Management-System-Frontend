import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Input() option:number=1;
  role:any = localStorage.getItem('role');
  constructor(private router: Router,public authService:AuthService) {
   
   }

  ngOnInit(): void {
    
    
  }
  click_demo(){
    this.router.navigateByUrl('admin/employeelist');
  }
  click_emp_list(){
    this.router.navigateByUrl('admin/employeelist');
  }
  click_register_emp(){
    this.router.navigateByUrl('admin/employeeregister');
  }
  click_patient_list(){
    this.router.navigateByUrl('admin/patientlist');
  }
  click_stats(){
    this.router.navigateByUrl('admin/stats');
  }
  click_change_password(){
    this.router.navigateByUrl('admin/ChangePassword');
  }
  click_signout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login');
  }
  
}
