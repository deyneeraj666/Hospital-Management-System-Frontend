import { Component, OnInit } from '@angular/core';
import { Medications } from 'src/app/Models/Medications';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  option:number=8;
  constructor() { }
  public data:Medications[]=[];
  ngOnInit(): void {
  }
  public drug_name:string="";
  public strength:string="";
  public ddate:Date=new Date();
  public frequency:string="";
  public form:string="";
  public quantity:string="";
  public notes:string="";
  add_medications(){
    let newData:Medications=new Medications();
    newData.strength=this.strength;
    newData.frequency=this.frequency;
    newData.drug_name=this.drug_name;
    newData.notes=this.notes;
    newData.form=this.form;
    newData.quantity=this.quantity;
    newData.ddate=this.ddate;
    
    this.data.push(newData);
    this.strength="";
    this.frequency="";
    this.drug_name="";
    this.notes="";
    this.form="";
    this.quantity="";
  }
  remove_medications(){
    
    this.strength="";
    this.frequency="";
    this.drug_name="";
    this.notes="";
    this.form="";
    this.quantity="";
    //this.ddate=new Date;
    
  }
  
}
