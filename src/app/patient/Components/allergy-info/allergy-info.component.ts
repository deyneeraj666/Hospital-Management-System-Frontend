import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Allergy } from 'src/app/Models/Allergy';
import { PmsService } from 'src/app/Service/pms.service';

@Component({
  selector: 'app-allergy-info',
  templateUrl: './allergy-info.component.html',
  styleUrls: ['./allergy-info.component.css']
})
export class AllergyInfoComponent implements OnInit {
  allergyTypes:Allergy[]=[];
  allergyNames:Allergy[]=[];
  allergyKnown:boolean=true;
  option:number=3;
  constructor(private service:PmsService) { }

  ngOnInit(): void {
    this.allergyTypes=this.service.getAllergy();
  }

  allergyNameChangeHandler(value:string)
  {
    this.allergyNames=this.service.getAllergyNamesByType(value)
  }

  public patientAllergyForm = new FormGroup({
    knownAllergy : new FormControl(""),
    allergyId : new FormControl(""),
    allergyType : new FormControl(""),
    allergyName : new FormControl(""),
    allergyDesc : new FormControl(""),
    allergyClinicalInfo : new FormControl(""),
    allergyFatal:new FormControl("")
  });

  onCancel(){
    this.patientAllergyForm.reset();
  }

}
