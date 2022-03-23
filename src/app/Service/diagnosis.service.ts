import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { Diagnosis } from '../Models/Diagnosis';
import { DiagnosisDetailsModel } from '../Models/DiagnosisModel';
@Injectable({
  providedIn: 'root'
})
export class Diag_Service{
     readonly Url = 'http://localhost:12207/api/Diagnosis';
     readonly diagUrl='http://localhost:12207/api/DiagnosisDetails'
    constructor(private http:HttpClient) {}

DiagnosisDetailsModel(diagDetails: DiagnosisDetailsModel,pid:string,appid:number) {
    let diagDetailsData=
      {
        "pid": pid,
        "diag_code":diagDetails.diag_code,
        "diag_name":diagDetails.diag_name,
        "ddate":new Date(),
        "AppointmentId":appid
    }
    return  this.http.post(this.Url,diagDetailsData);
  }
  getDiagnosisDetailsByPatientId(pid: string) :Observable<any>{
   
    const url =`${this.Url}/${pid}`;
    return this.http.get(url);
  }
  getDiagnosisDetailsByApptId(apptID: string) :Observable<any>{
    
    const url =`${this.Url}/${apptID}`;
    return this.http.get(url);
  }
  getdiagnosis():Observable<any>
  {
    
    const url=this.diagUrl;
    return this.http.get(url);
    //this.getDiagnosisDetailsByPatientId(t)

  }
  deleteDiagDetails(id:number){
    
     const url =`${this.Url}/${id}`;
    return this.http.delete(url);
  }
  getDiagnosisCodeByType(diagCode: string){
      const url = `${this.diagUrl}/${diagCode}`;
   
      return this.http.get(url);
  
    
  }


}
