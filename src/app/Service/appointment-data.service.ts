import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private httpobj:HttpClient) { }

  url:string ='http://localhost:56264/api/Appointment/';
  urlPhysician:string='http://localhost:3001/physician';
  public GetAllPhysician():Observable<any>{
    return  this.httpobj.get(this.urlPhysician);
  }
  public GetAppointment():Observable<any>{
       
    return  this.httpobj.get(this.url+'GetAll');
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
