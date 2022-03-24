import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private httpobj:HttpClient) { }

  url:string ='http://localhost:56264/api/Appointment/';
  urlPhysician:string='http://localhost:3001/physician';
  _urlPhysician:string='http://localhost:3002/physician';
  userAccountURL:string ="http://localhost:5517/api/Account/GetAllUsers"

  public GetAllPhysician():Observable<any>{
    return  this.httpobj.get(this.urlPhysician);
  }
  public GetAppointment():Observable<any>{
       
    return  this.httpobj.get(this.url+'GetAll');
  }
  public GetPhysician(){
    return  this.httpobj.get(this.userAccountURL);
    
  }
  public async GetPhysicianTemp():Promise<any>{
    return  this.httpobj.get(this.userAccountURL).toPromise();;
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
  public TestPatientservice()
  {
    
      return this.httpobj.get(this.userAccountURL);
  }

  public  patientExistorNot(Id: string):Observable<any> {
      return this.httpobj.get<any[]>(this.userAccountURL);
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

  getAppointmentsByIdAndStatusConfirmed(pid:string):Observable<any>{
    const appointmentUrl=`${this.url}GetAppointmentsByIdAndStatusConfirmed?patientid=${pid}`;
    return this.httpobj.get(appointmentUrl);
  }
}
