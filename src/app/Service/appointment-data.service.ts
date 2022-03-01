import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private httpobj:HttpClient) { }

  url:string ='http://localhost:3000/AppointmentData';
  urlPhysician:string='http://localhost:3001/physician';
  public GetAllPhysician():Observable<any>{
    return  this.httpobj.get(this.urlPhysician);
  }
  public GetAppointment():Observable<any>{
       
    return  this.httpobj.get(this.url);
  }
  public AddAppointment(objAppointment:any):Observable<any>{
       
    return  this.httpobj.post(this.url,objAppointment);
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
    return  this.httpobj.put(this.url+"/"+Number(objAppointment.Id),objAppointment);
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
       
    return  this.httpobj.delete(this.url+"/"+id);
  }
}
