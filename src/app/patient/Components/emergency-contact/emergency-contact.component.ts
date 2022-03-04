import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PmsService } from 'src/app/Service/pms.service';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css'],
})
export class EmergencyContactComponent implements OnInit {
  option: number = 2;
  pid:string='';

  isSubmitClicked: boolean = true;
  isEditClicked: boolean = false;
  isCancelClicked: boolean = true;

  constructor(private pmsService: PmsService, private toastr: ToastrService,private auth:AuthService) {}

  ngOnInit(): void {
    this.pid=this.auth.Id;

    this.pmsService.getEmergencyContactDetailByPatientId(this.pid).subscribe(
      (res)=>{
        this.fillEmergencyForm(res);
      },
      (err:any)=>{
        console.log(err);
        console.log('Error occurred');
      }
    );
  }


  public patientEmergencyForm = new FormGroup({
    efname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    elname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    relationship: new FormControl(''),
    eemail: new FormControl('', Validators.email),
    // econtact: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^\\+1\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'),
    // ]),
    econtact : new FormControl("",[Validators.required,Validators.pattern("^([0-9]{1,5})?([7-9][0-9]{9})$")]),

    eaddress: new FormControl(''),
    access: new FormControl(''),
  });

  fillEmergencyForm(data: any) {
    this.patientEmergencyForm.controls['efname'].setValue(data?.firstName);
    this.patientEmergencyForm.controls['elname'].setValue(data?.lastName);
    this.patientEmergencyForm.controls['relationship'].setValue(data?.relationship);
    this.patientEmergencyForm.controls['eemail'].setValue(data?.emailId);
    this.patientEmergencyForm.controls['econtact'].setValue(data?.contactNumber);
    this.patientEmergencyForm.controls['eaddress'].setValue(data?.address);
    this.patientEmergencyForm.controls['access'].setValue(data?.patientPortalAccess);
  
    this.disableFormProperties();
    this.isSubmitClicked=false;
    this.isEditClicked=true;
    this.isCancelClicked=false;
  }

  disableFormProperties() {
    this.patientEmergencyForm.controls['efname'].disable();
    this.patientEmergencyForm.controls['elname'].disable();
    this.patientEmergencyForm.controls['relationship'].disable();
    this.patientEmergencyForm.controls['eemail'].disable();
    this.patientEmergencyForm.controls['econtact'].disable();
    this.patientEmergencyForm.controls['eaddress'].disable();
    this.patientEmergencyForm.controls['access'].disable();
  }

  enableFormProperties() {
    this.patientEmergencyForm.controls['efname'].enable();
    this.patientEmergencyForm.controls['elname'].enable();
    this.patientEmergencyForm.controls['relationship'].enable();
    this.patientEmergencyForm.controls['eemail'].enable();
    this.patientEmergencyForm.controls['econtact'].enable();
    this.patientEmergencyForm.controls['eaddress'].enable();
    this.patientEmergencyForm.controls['access'].enable();
  }

  onEdit() {
    this.enableFormProperties();
    this.isSubmitClicked = !this.isSubmitClicked;
    this.isEditClicked = !this.isEditClicked;
    this.isCancelClicked = !this.isCancelClicked;
  }

  onSubmit() {
    this.pmsService.savePatientEmergencyInfo(this.patientEmergencyForm.value,this.pid)
    .subscribe((res)=>{
      this.toastr.success('Successfully Submitted');
      this.disableFormProperties();
      this.isSubmitClicked = !this.isSubmitClicked;
      this.isEditClicked = !this.isEditClicked;
      this.isCancelClicked = !this.isCancelClicked;
    },
    (err:any)=>{
      console.log('Error occurred ', err);
    });
  }
  

  onCancel(){
    this.patientEmergencyForm.reset();
   // this.initializeFormGroup();
  }

  // initializeFormGroup(){
  //   this.patientEmergencyForm.setValue({
  //     efname:'',
  //     elname:'',
  //     relationship:'',
  //     eemail:'',
  //     econtact:'',
  //     eaddress:'',
  //     access:''
  //   });
  //   console.log(this.patientEmergencyForm.value);
    
  // }
}
