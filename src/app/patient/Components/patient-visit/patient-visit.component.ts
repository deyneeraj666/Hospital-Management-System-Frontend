import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {

  option:number=9;
  constructor() { }

  ngOnInit(): void {
  }

}
