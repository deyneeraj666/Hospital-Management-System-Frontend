import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { Procedure } from '../Models/Procedure';

@Injectable({
  providedIn: 'root'
})
export class Procedure_Service{
    readonly Url = 'http://localhost:44364/api/Procedures';
    readonly procUrl = 'http://localhost:44364/api/ProcedureDetails';
    constructor(private http:HttpClient) {}

    Procedure(procDetails: Procedure,pid:string) {
    let procDetailsData=
      {
        "PatientId": pid,
        "ProcedureCode":procDetails.ProcedureCode,
        "ProcedureName":procDetails.ProcedureName,
        "Date":new Date(),
        "AppointmentId":"2010"
    }
    return  this.http.post(this.Url,procDetailsData);
  }
  getProceduresDetailsByPatientId(pid: string) :Observable<any>{
    const url =`${this.Url}/${pid}`;
    return this.http.get(url);
  }
  getprocedure():Observable<any>
  {
    const url=this.procUrl;
    return this.http.get(url);


  }
  getProcedureNameByType(procCode: string){
    const url = `${this.procUrl}/${procCode}`;
 
    return this.http.get(url);

  
}
}