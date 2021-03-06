import { AuthService } from "./../../../Shared/auth.service";
import { Router } from "@angular/router";
import { Component, ElementRef, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit 
{
  @Input() option:number =1;
  role:any = localStorage.getItem('role');
  constructor(private router: Router,public authService:AuthService) { 
    console.log(this.authService.role);
  }


  

  click_demo(){
      this.router.navigateByUrl('login/patient/demographic');
  }
  click_vital(){
    this.router.navigateByUrl('login/patient/vital');
  }
  click_allery(){
    this.router.navigateByUrl('login/patient/allergy');
  }
  click_appointment(){
    this.router.navigateByUrl('login/patient/appointment');
  }
  click_procedure(){
    this.router.navigateByUrl('login/patient/procedure');
  }
  click_medication(){
    this.router.navigateByUrl('login/patient/medications');
  }
  click_diagnosis(){
    this.router.navigateByUrl('login/patient/diagnosis');
  }
  click_emergencycontact(){
    this.router.navigateByUrl('login/patient/emergency-contact-Info');
  }
  click_change_password(){
    this.router.navigateByUrl('login/patient/ChangePassword');
  }
  click_signout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login');
  }
  click_patientVisit(){
    this.router.navigateByUrl('login/patient/PatientVisit');

  }

  click_home(){
    this.router.navigateByUrl('nurse/appointment');
  }

  click_home_physician(){
    this.router.navigateByUrl('physician/appointment');
  }
  ngOnInit(): void {
    
  }
}
