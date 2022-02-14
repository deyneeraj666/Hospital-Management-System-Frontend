import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    alert(this.form)
    
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
  deleteproduct_click(index:number){
    this.data.splice(index,1);
  }
  editproduct_click(name:string){
    let editData:any=this.data.find(x=>x.drug_name==name);
    this.drug_name=editData.drug_name;
    this.strength=editData.strength;
    this.ddate=editData.ddate;
    this.frequency=editData.frequency;
    this.form=editData.form;
    this.quantity=editData.quantity;
    this.notes=editData.notes;
  }
  public patientMedicationTable:FormGroup=new FormGroup({
    drugname_data: new FormControl('', [
      Validators.required
    ]),
    frequency_data: new FormControl('', [Validators.required, Validators.minLength(2)]),
    
    strength_data: new FormControl('', [Validators.required,]),
    form_data: new FormControl('', Validators.required),
    quantity_data: new FormControl('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    notes_data: new FormControl('',[
      Validators.minLength(1),
      Validators.required,
    ]),
    
  })
  
}
