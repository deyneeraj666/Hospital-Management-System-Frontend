import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { MedicationsModel } from '../Models/MedicationModel';
@Injectable({
  providedIn: 'root'
})
export class Medication_Service{
    readonly Url = 'http://localhost:52993/api/Medications';
    constructor(private http:HttpClient) {}

    MedicationsModel(mediDetails: MedicationsModel,pid:string) {
    let mediDetailsData=
      {
        "PatientId": pid,
        "DrugName":mediDetails.DrugName,
        "Strength":mediDetails.Strength,
        "Date":new Date(),
        "Frequency":mediDetails.Frequency,
        "Form":mediDetails.Form,
        "Quantity":mediDetails.Quantity,
        "Notes":mediDetails.Notes,
        "AppointmentId":"2006"
    }
    return  this.http.post(this.Url,mediDetailsData);
  }
  getMedicationsDetailsByPatientId(pid: string) :Observable<any>{
    const url =`${this.Url}/${pid}`;
    return this.http.get(url);
  }
  getmedications()
  {
     this.http.get("http://localhost:52993/api/Medications/GetallMedications")
           .subscribe(response =>{
            const datas=(<any> response);
            console.log(datas);
          });


  }
}