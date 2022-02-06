import { Injectable } from '@angular/core';
import { savePatientDemographicInfo } from '../Models/PatientModuleModels';

@Injectable({
  providedIn: 'root'
})
export class PmsService {
  dbEmails: string[] = [
    "john@gmail.com",
    "john1@gmail.com",
    "john2@gmail.com",
    "john3@gmail.com",
  ];
  constructor() { }

  verifyEmail(email: string) {
    return this.dbEmails.includes(email);
  }

  getAllergy() {
    return [
      {
        allergyId: "Aca s 13",
        allergyType: "Mite",
        allergyName: "Mite"
      },
      {
        allergyId: "Act c 10",
        allergyType: "Food",
        allergyName: "Kiwi"
      },

    ]
  }

  getAllergyNamesByType(allergyType: string) {

    switch (allergyType.toLocaleLowerCase()) {
      case "food":

        return [{ allergyName: "Kiwi" },
        { allergyName: "Kiwi1" },
        { allergyName: "Kiwi2" },]
        break;
      case "mite":

        return [{ allergyName: "Mite" },
        { allergyName: "Mite1" },
        { allergyName: "Mite2" },
        { allergyName: "Mite3" },]
        break;
      default:

        return [{ allergyName: "Dog" },
        { allergyName: "Dog1" },
        { allergyName: "MiDog2te2" },]
        break;
    }
  }


  savePatientDemographicInfo(demoInfo:savePatientDemographicInfo)
  {
    console.log("From service");
    console.log(demoInfo);
    return true;
  }
}
