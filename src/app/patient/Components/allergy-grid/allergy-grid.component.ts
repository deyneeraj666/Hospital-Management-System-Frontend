import { Component, Input, OnInit } from '@angular/core';
import { Allergy } from 'src/app/Models/Allergy';

@Component({
  selector: 'app-allergy-grid',
  templateUrl: './allergy-grid.component.html',
  styleUrls: ['./allergy-grid.component.css']
})
export class AllergyGridComponent implements OnInit {

  @Input()
  allergies:Allergy[]=[];
  
  constructor() { }

  ngOnInit(): void {
  }

  //to delete particular allergy added
  onDelete(id?:string)
  {
    // alert(id);
    let index:number=this.allergies.findIndex(x=>x.allergyId==id);
    this.allergies.splice(index,1);
  }
}
