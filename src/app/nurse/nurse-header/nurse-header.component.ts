import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-header',
  templateUrl: './nurse-header.component.html',
  styleUrls: ['./nurse-header.component.css']
})
export class NurseHeaderComponent implements OnInit {

  @Input() option:number =0;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  click_demo(){
    this.router.navigateByUrl('nurse/appointment');
  }
  click_profile(){
    this.router.navigateByUrl('nurse/profile');
  }
  click_notes(){
    this.router.navigateByUrl('nurse/notes');
  }
  click_appointment(){
    this.router.navigateByUrl('nurse/appointment');
  }
  click_change_password(){
    this.router.navigateByUrl('nurse/ChangePassword');
  }
  click_signout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    this.router.navigateByUrl('login');
  }
}
