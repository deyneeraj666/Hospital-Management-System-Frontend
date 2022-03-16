import { forEach } from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientRoleUser'
})
export class PatientRoleUserPipe implements PipeTransform 
{
  outputList: any[]=[];
  i: number=0;
  transform(dataList:any):any
  {
    this.outputList=[]
    for( this.i=0;this.i<dataList.length;this.i=this.i+1 )
    {
      if(dataList[this.i].role=="Patient")
      {
        this.outputList.push(dataList[this.i])
      }
     }
    return this.outputList
   
  }

}
