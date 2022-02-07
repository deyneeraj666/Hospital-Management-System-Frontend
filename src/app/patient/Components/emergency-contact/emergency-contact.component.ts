import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css']
})
export class EmergencyContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public patientEmergencyForm = new FormGroup({
    efname : new FormControl("",[Validators.required,Validators.minLength(2)]),
    elname : new FormControl("",[Validators.required,Validators.minLength(2)]),
    relationship : new FormControl(""),
    eemail:new FormControl("",Validators.email),
    econtact : new FormControl("",[Validators.required,Validators.pattern("^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$")]),
    eaddress : new FormControl(""),
    access: new FormControl(""),

})

}
