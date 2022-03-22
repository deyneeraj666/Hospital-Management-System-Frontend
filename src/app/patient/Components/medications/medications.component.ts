import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { timingSafeEqual } from 'crypto';
import { MedicationsModel } from 'src/app/Models/MedicationModel';

import { Medication_Service } from 'src/app/Service/medications.service';
import { AuthService } from 'src/app/Shared/auth.service';
import { ConsultingService } from 'src/app/Shared/consulting.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  option:number=8;
  constructor(private medicationService: Medication_Service,
    private auth: AuthService,private consultingService :ConsultingService,private toaster:ToastrService) { }
  public data:MedicationsModel[]=[];
  public pid: string = '';
  public apptid:number=0;
  public drugName: any[] = [];
  public form: any[] = [];
  public strength: any[] = [];
  public drugDetails:any[]=[];
  // public procedureCode: any[] = [];
  // public procedureName: any[] = [];
  // public procedureCode: any[] = [];
  ngOnInit(): void {
    this.pid = this.consultingService.consultingPId;
    this.apptid=this.consultingService.consultingApptId;
    // this.medicationService.getMedicationsDetailsByPatientId(this.pid).subscribe(
    //   (res) => {
    //     console.log('Data is there');
    //     this.fillDiagnosisForm(res);
    //     console.log(res);
    //   },
    //   (err: any) => {
    //     console.log(err);
    //     console.log('Error occurred');
    //   }
    // );

    this.medicationService.getmedications().subscribe(
      (res) => {
      this.drugName = res;
       console.log(res);
     },
     (err) => {
       console.log(err);
       console.log('Error occurred');
     })

    
  }
  public DrugName:string="";
  public Strength:string="";
  public Date:Date=new Date();
  public Frequency:string="";
  public Form:string="";
  public Quantity:string="";
  public Notes:string="";
  
  public isDataNotfound:boolean=false;
  add_medications(){
    this.data.push(this.patientMedicationTable.value)
    
    this.medicationService
      .MedicationsModel(this.patientMedicationTable.value,this.pid,this.apptid)
      .subscribe(
        (res) => {
          console.log(res);
          this.patientMedicationTable.reset();
          this.toaster.success("Medication is Added");
        },
        (err) => {
          console.log('Error occurred ', err);
          
          
        }
      );
  }
  drugNameChangeHandler(name:string){
    this.medicationService.getDrugDetailsByName(name).subscribe(
      (res: any) => {
        console.log(res);
        this.drugDetails = res;
        
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  fillDiagnosisForm(data: any) {
    
  
  }
  remove_medications(){
    
    this.Strength="";
    this.Frequency="";
    this.DrugName="";
    this.Notes="";
    this.Form="";
    this.Quantity="";
    //this.ddate=new Date;
    
  }
  deleteproduct_click(index:number){
    this.data.splice(index,1);
  }
  editproduct_click(name:string){
    let editData:any=this.data.find(x=>x.DrugName==name);
    this.DrugName=editData.DrugName;
    this.Strength=editData.Strength;
    this.Date=editData.Date;
    this.Frequency=editData.Frequency;
    this.Form=editData.Form;
    this.Quantity=editData.Quantity;
    this.Notes=editData.Notes;
  }
  // getMedi() {
  //   this.medicationService.getmedications();
  // }
  public patientMedicationTable:FormGroup=new FormGroup({
    DrugName: new FormControl('', [
      Validators.required
    ]),
    Frequency: new FormControl('', [Validators.required, Validators.minLength(1)]),
    
    Strength: new FormControl('', [Validators.required,]),
    Form: new FormControl('', Validators.required),
    Quantity: new FormControl('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    Notes: new FormControl('',[
      Validators.minLength(1),
      Validators.required,
    ]),
    
  })
  
}
