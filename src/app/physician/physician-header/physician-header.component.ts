import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physician-header',
  templateUrl: './physician-header.component.html',
  styleUrls: ['./physician-header.component.css']
})
export class PhysicianHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  click_demo(){
    this.router.navigateByUrl('physician/appointment');
  }
  click_profile(){
    this.router.navigateByUrl('physician/profile');
  }
  click_notes(){
    this.router.navigateByUrl('physician/notes');
  }
  click_appointment(){
    this.router.navigateByUrl('physician/appointment');
  }
  click_change_password(){
    this.router.navigateByUrl('login/patient-header/ChangePassword');
  }
  click_signout(){
    this.router.navigateByUrl('login');
  }
}
