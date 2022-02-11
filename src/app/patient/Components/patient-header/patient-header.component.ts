import { Router } from "@angular/router";
import { Component, ElementRef, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit {
  @Input() option:number =1;
  constructor(private router: Router) { }

  

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
    this.router.navigateByUrl('login');
  }

  ngOnInit(): void {
    
  }
}
