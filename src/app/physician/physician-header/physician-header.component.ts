import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physician-header',
  templateUrl: './physician-header.component.html',
  styleUrls: ['./physician-header.component.css']
})
export class PhysicianHeaderComponent implements OnInit {
  @Input() option:number=0;
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
    this.router.navigateByUrl('physician/ChangePassword');
  }
  click_signout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    this.router.navigateByUrl('login');
  }
}
