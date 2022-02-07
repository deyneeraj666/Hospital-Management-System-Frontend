import { Router } from "@angular/router";
import { Component, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit {
  myColorVaraible:boolean=false;
  constructor(private router: Router,private elementref:ElementRef) { }

  ngOnInit(): void {
  }

  click_demo(){
      this.router.navigateByUrl('login/patient-header/demographic');
  }
  click_vital(){
    this.router.navigateByUrl('login/patient-header/vital');
  }
  click_allery(){
    this.router.navigateByUrl('login/patient-header/allergy');
  }
  click_appointment(){
    this.router.navigateByUrl('login/patient-header/appointment');
  }
  click_procedure(){
    this.router.navigateByUrl('login/patient-header/procedure');
  }
  click_medication(){
    this.router.navigateByUrl('login/patient-header/medications');
  }
  click_diagnosis(){
    this.router.navigateByUrl('login/patient-header/diagnosis');
  }
  click_emergencycontact(){
    this.router.navigateByUrl('login/patient-header/emergency-contact-Info');
  }
  click_change_password(){
    this.router.navigateByUrl('login/patient-header/ChangePassword');
  }
  click_signout(){
    this.router.navigateByUrl('login');
  }
}
