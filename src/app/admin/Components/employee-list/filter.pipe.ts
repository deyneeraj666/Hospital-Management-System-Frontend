import { Pipe,PipeTransform } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';

@Pipe({
    name:'filter',
    pure:true
})
export class filterPipe implements PipeTransform{
    transform(empData: Employee[], searchedKeyword: number|any):Employee[] {
       
        if(!empData||!searchedKeyword){
            return empData;
        }
        
        
        // else if(empData.filter(empData=>empData.emp_name.toLowerCase())==searchedKeyword.toLowerCase()){
        // return empData.filter(data=>data.emp_name.toLowerCase().indexOf(searchedKeyword.toLowerCase())!=-1)
        // }
        
        
        
        else if(empData.filter(empData=>empData.emp_id==searchedKeyword))
        return empData.filter(data=>data.emp_id==searchedKeyword);

        else
        { if(empData.filter(empData=>empData.emp_name==searchedKeyword))
        return empData.filter(data=>data.emp_name.toLowerCase().indexOf(searchedKeyword.toLowerCase())!=-1)
        }

        return empData.filter(data=>data.emp_name.toLowerCase().indexOf(searchedKeyword.toLowerCase())!=-1)
    }
}

