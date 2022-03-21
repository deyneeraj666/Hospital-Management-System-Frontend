import { forEach } from "lodash";
import { UsermanagementService } from "./../../../Shared/usermanagement.service";
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  
  option:number=2;
  pat_value:number=0;
  adm_value:number=0;
  nur_value:number=0;
  phy_value:number=0;
  res:any;
  i:number=0;
  constructor(private user:UsermanagementService) {
    
  }

  ngOnInit(): void 
  {
    this.user.get_all_user_service().subscribe((res:any)=>
      {
        this.res = res; 
        for( this.i=0;this.i<res.length;this.i=this.i+1 )
        {
          if(res[this.i].role=="Patient")
          {
            this.pat_value =this.pat_value+1;
          }
          else if(res[this.i].role=="Nurse")
          {
            this.nur_value =this.nur_value+1;
          }
          else if(res[this.i].role=="Physician")
          {
            this.phy_value =this.phy_value+1;
          }
          else{
            this.adm_value =this.adm_value+1;
          }
         }
      });

    
  }

 

  

}
