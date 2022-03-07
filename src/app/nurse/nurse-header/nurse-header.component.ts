import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-nurse-header',
  templateUrl: './nurse-header.component.html',
  styleUrls: ['./nurse-header.component.css']
})
export class NurseHeaderComponent implements OnInit {
  role:any = localStorage.getItem('role');
  @Input() option:number =0;
  constructor(private router:Router,public authService:AuthService) { }

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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('login');
  }
}
