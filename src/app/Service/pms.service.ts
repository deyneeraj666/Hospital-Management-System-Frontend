import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from '../Models/Allergy';
import { savePatientEmergencyInfo } from '../Models/Emergency';

import { savePatientDemographicInfo } from '../Models/PatientModuleModels';

@Injectable({
  providedIn: 'root',
})
export class PmsService {

  readonly Url = 'http://localhost:64193/api/Demographics';
  readonly EmergencyUrl ='http://localhost:64193/api/EmergencyDetails'

 
  constructor(private http:HttpClient) {}

  getAllergy() {
    return [
      {
        allergyId: 'Aca s 13',
        allergyType: 'Mite',
        allergyName: 'Mite',
      },
      {
        allergyId: 'Act c 10',
        allergyType: 'Food',
        allergyName: 'Kiwi',
      },
    ];
  }

  getAllergyNamesByType(allergyType: string) {
    switch (allergyType.toLocaleLowerCase()) {
      case 'food':
        return [
          { allergyName: 'Kiwi' },
          { allergyName: 'Kiwi1' },
          { allergyName: 'Kiwi2' },
        ];
        break;
      case 'mite':
        return [
          { allergyName: 'Mite' },
          { allergyName: 'Mite1' },
          { allergyName: 'Mite2' },
          { allergyName: 'Mite3' },
        ];
        break;
      default:
        return [
          { allergyName: 'Dog' },
          { allergyName: 'Dog1' },
          { allergyName: 'MiDog2te2' },
        ];
        break;
    }
  }

  savePatientDemographicInfo(demoInfo: savePatientDemographicInfo,pid:string) {
    let demographicData=
      {
        "patientId": pid,
        "title": demoInfo.title,
        "firstName": demoInfo.fname,
        "lastName": demoInfo.lname,
        "dob": demoInfo.dob,
        "age": 21,
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

  saveAllergyInfo(demoInfo: Allergy) {
    // console.log("From service");
    // console.log(demoInfo);
    return true;
  }

  getDemographicInfoByPatientId(pid: string) :Observable<any>{
    const url =`${this.Url}/${pid}`;
    return this.http.get(url);
  }


  getEmergencyContactDetailByPatientId(pid: string) :Observable<any>{
    const url =`${this.EmergencyUrl}/${pid}`;
    return this.http.get(url);
  }
  
}
