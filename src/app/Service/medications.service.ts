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
    readonly mediUrl = 'http://localhost:52993/api/MedicationsDetails';
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
    const url=this.mediUrl;
    return this.http.get(url);


  }
}