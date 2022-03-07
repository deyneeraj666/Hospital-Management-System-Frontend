import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private httpobj:HttpClient) { }

  url:string ='http://localhost:56264/api/Appointment/';
  urlPhysician:string='http://localhost:3001/physician';
  _urlPhysician:string='http://localhost:3002/physician';
  public GetAllPhysician():Observable<any>{
    return  this.httpobj.get(this.urlPhysician);
  }
  public GetAppointment():Observable<any>{
       
    return  this.httpobj.get(this.url+'GetAll');
  }
  public GetPhysician(){
    return  this.httpobj.get(this._urlPhysician);
    
  }
  public GetPhysicianTemp(){
    let physician:any[]=[];
      this.GetPhysician().subscribe((response: any) => {
      response.forEach((data: any) => {
         physician.push({
          "physicianName": data.physicianName,
          "physicianId": data.physicianId,
          "Specialization": data.Specialization
        })
      }); 
    });
    delay(15000);
    return physician;
  }
  public AddAppointment(objAppointment:any):Observable<any>{
       console.log('Service Object'+ objAppointment)
       console.log( objAppointment)
    return  this.httpobj.post('http://localhost:56264/api/Appointment/Create',objAppointment);
  }
  public GetAppointmentById(Id :number)
  {
    return this.httpobj.get<any[]>(this.url).pipe(
      map(res=>
        {
          return res.filter(x => x.Id==Id.toString())
        })
       );
  }
  public patientExistorNot(Id :number)
  {
    
      return  {"PatientExist":true,"PatientName":'Demo Patient from Service' }
    // return this.httpobj.get<any[]>(this.url).pipe(
    //   map(res=>
    //     {
    //      let patientDetails= res.filter(x => x.Id==Id.toString())
    //      if(patientDetails.length>0)
    //      {
    //        return  {"PatientExist":true,"PatientName":patientDetails[0].patientName }
    //      }else {
    //       return  {"PatientExist":false,"PatientName":''}
    //      }
    //     })
    //   );
  }
  public UpdateAppointment(objAppointment:any)
  {
    return  this.httpobj.put(this.url+'AppointmentUpdateById?id='+Number(objAppointment.id),objAppointment);
  }
  public GetAppointmentByName(name :string)
  {
    return this.httpobj.get<any[]>(this.url).pipe(
      map(res=>
        {
          return res.filter(x => x.Subject==name.toString())
        })
       );
  }
 
  public DeleteAppointment(id:number):Observable<any>{
       
    return  this.httpobj.get<any[]>(this.url+'AppointmentDeleteById?id='+id)
  }
}
