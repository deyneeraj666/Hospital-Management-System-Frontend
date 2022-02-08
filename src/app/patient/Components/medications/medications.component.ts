import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  option:number=8;
  constructor() { }

  ngOnInit(): void {
  }

}
