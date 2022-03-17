import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { Procedure } from '../Models/Procedure';

@Injectable({
  providedIn: 'root'
})
export class Procedure_Service{
    readonly Url = 'http://localhost:30670/api/Procedures';
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
  getprocedure()
  {
     this.http.get("http://localhost:30670/api/Procedures/GetallProcedures")
           .subscribe(response =>{
            const datas=(<any> response);
            console.log(datas);
          });


  }
}