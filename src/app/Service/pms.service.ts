import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from '../Models/Allergy';
import { savePatientEmergencyInfo } from '../Models/Emergency';

import { savePatientDemographicInfo } from '../Models/PatientModuleModels';
import { savePatientVitalInfo } from '../Models/Vital';

@Injectable({
  providedIn: 'root',
})
export class PmsService {

  readonly Url = 'http://localhost:64193/api/Demographics';
  readonly EmergencyUrl ='http://localhost:64193/api/EmergencyDetails';
  readonly AllergyUrl ='https://localhost:44338/api/Allergies';
  readonly PatientAllergy='https://localhost:44338/api/PatientAllergies';
  readonly PatientVital='http://localhost:49526/api/Vitals';
  readonly PatientDiagnosis='http://localhost:12207/api/Diagnosis';
  readonly PatientProcedure='https://localhost:44364/api/Procedures';
  readonly PatientMEdication='http://localhost:52993/api/Medications';


 
  constructor(private http:HttpClient) {}

  getAllergy():Observable<any> {
    const url=this.AllergyUrl;
    return this.http.get(url);
  }

  getAllergyNamesByType(allergyType: string) {

    const url = `${this.AllergyUrl}/${allergyType}`;
    return this.http.get(url);

  }

  savePatientAllergyInfo(allergyInfo: Allergy,pid:string) {
    let allergyData={
      "patientId":pid,
      "allergy_Type":allergyInfo.allergyType,
      "allergy_Name":allergyInfo.allergyName,
      "allergy_Description":allergyInfo.allergyDesc,
      "allergy_Clinical_Info":allergyInfo.allergyClinicalInfo,
      "isAllergyFatal":allergyInfo.isAllergyFatal
    }
    return this.http.post(this.PatientAllergy,allergyData);
  }

 getPatientAllergyByPatientId(pid:string):Observable<any>{
   const url=`${this.PatientAllergy}/${pid}`;
   return this.http.get(url);
 }

 deletePatientAllergy(id:number):Observable<any>{

   
   const url=`${this.PatientAllergy}/${id}`;
   return this.http.delete(url);
 }

  savePatientDemographicInfo(demoInfo: savePatientDemographicInfo,pid:string) {
    let demographicData=
      {
        "patientId": pid,
        "title": demoInfo.title,
        "firstName": demoInfo.fname,
        "lastName": demoInfo.lname,
        "dob": demoInfo.dob,
        "gender": demoInfo.gender,
        "race": demoInfo.race,
        "ethnicity": demoInfo.ethnicity,
        "languagesKnown": demoInfo.language,
        "emailId": demoInfo.email,
        "homeAddress": demoInfo.address,
        "contactNumber": demoInfo.contact
    }
    return  this.http.post(this.Url,demographicData);
  }
  
  savePatientEmergencyInfo(emergencyInfo: savePatientEmergencyInfo,pid:string) {
    let emergencyData={
      "patientId":pid,
      "firstName":emergencyInfo.efname,
      "lastName":emergencyInfo.elname,
      "relationship":emergencyInfo.relationship,
      "emailId":emergencyInfo.eemail,
      "contactNumber":emergencyInfo.econtact,
      "address":emergencyInfo.eaddress,
      "patientPortalAccess":emergencyInfo.access
    }
    return this.http.post(this.EmergencyUrl,emergencyData);
  }

  

  getDemographicInfoByPatientId(pid: string) :Observable<any>{
    const url =`${this.Url}/${pid}`;
    return this.http.get(url);
  }


  getEmergencyContactDetailByPatientId(pid: string) :Observable<any>{
    const url =`${this.EmergencyUrl}/${pid}`;
    return this.http.get(url);
  }
  

  getVitalDetailsByAppointmentId(appointmentId:number):Observable<any>{
    const url =`${this.PatientVital}/${appointmentId}`;
    return this.http.get(url);
  }

  savePatientVitalInfo(vitalInfo: savePatientVitalInfo,pid:string,apptId:number) {
    let vitalData=
      {
        "patientId": pid,
        "appointmentId": apptId,
        "weight": vitalInfo.weight,
        "height": vitalInfo.height,
        "temperature": vitalInfo.temperature,
        "systolic": vitalInfo.systolic,
        "diastolic": vitalInfo.diastolic,
        "respiratoryRate": vitalInfo.respiratoryRate,
      
    }
    return  this.http.post(this.PatientVital,vitalData);
  }

  getDiagnosisDetailsByAppointmentId(appointmentId:number):Observable<any>{
    const url =`${this.PatientDiagnosis}/${appointmentId}`;
    return this.http.get(url);
  }

  getProcedureDetailsByAppointmentId(appointmentId:any):Observable<any>{
    const url =`${this.PatientProcedure}/${appointmentId}`;
    return this.http.get(url);
  }

  getMedicationDetailsByAppointmentId(appointmentId:any):Observable<any>{
    const url =`${this.PatientMEdication}/${appointmentId}`;
    return this.http.get(url);
  }

}