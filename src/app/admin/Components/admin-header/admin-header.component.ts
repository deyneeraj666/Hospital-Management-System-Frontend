import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) { }

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
  click_change_password(){
    this.router.navigateByUrl('login/patient-header/ChangePassword');
  }
  click_signout(){
    this.router.navigateByUrl('login');
  }
  
}
