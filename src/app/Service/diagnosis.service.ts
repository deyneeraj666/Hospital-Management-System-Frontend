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

DiagnosisDetailsModel(diagDetails: DiagnosisDetailsModel,pid:string,p_id:string) {
    let diagDetailsData=
      {
        "pid": pid,
        "diag_code":diagDetails.diag_code,
        "diag_name":diagDetails.diag_name,
        "ddate":new Date(),
        "AppointmentId":"2020"
    }
    return  this.http.post(this.Url,diagDetailsData);
  }
  getDiagnosisDetailsByPatientId(pid: string) :Observable<any>{
    //const getUrl = 'http://localhost:12207/api/Diagnosis/GetDiagosisNameByDiagnosisCode';
    const url =`${this.diagUrl}/${pid}`;
    return this.http.get(url);
  }
  getDiagnosisDetailsByApptId(apptID: string) :Observable<any>{
    //const getByIdUrl = 'http://localhost:12207/api/Diagnosis/GetDiagDetailsByApptID';
    const url =`${this.diagUrl}/${apptID}`;
    return this.http.get(url);
  }
  getdiagnosis():Observable<any>
  {
    //  this.http.get("http://localhost:12207/api/Diagnosis/GetallDiagnosis")
    //        .subscribe(response =>{
    //         const datas=(<any> response);
    //         console.log(datas);
    //       });
    const url=this.Url;
    return this.http.get(url);
    //this.getDiagnosisDetailsByPatientId(t)

  }
  deleteDiagDetails(p_id:string){
    const deleteUrl = 'http://localhost:12207/api/Diagnosis/GetDiagDetailsByApptID';
     const url =`${deleteUrl}/${p_id}`;
    return this.http.delete(url);
  }
  getDiagnosisCodeByType(diagCode: string){
      const url = `${this.Url}/${diagCode}`;
    //   const getUrl = 'http://localhost:12207/api/Diagnosis/GetDiagosisNameByDiagnosisCode';
    // const url =`${getUrl}/${diagCode}`;
      return this.http.get(url);
  
    
  }

// function diagDetails(diagDetails: any, DiagnosisModel: any, pid: any, string: any) {
//     throw new Error('Function not implemented.');
// }
}
