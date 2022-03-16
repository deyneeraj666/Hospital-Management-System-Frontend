import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultingService {

  consultingPId:string='';
  consultingApptId:number=0;

  constructor() { }

  updateConsultingPatientDetails(pid:string,apptId:number){
    this.consultingPId=pid;
    this.consultingApptId=apptId;
  }

}
