import { ToastrService } from "ngx-toastr";
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css']
})
export class VitalSignsComponent implements OnInit
{
  height:string="0";
  weight:string="0";
  blood_pressure:string="0/0";
  temperature:string="0";
  respiration_rate:string="0";
  actionenable=true;
  btndisable=false;

  constructor(private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }
  edit_click(){
    this.actionenable=false;
  }
  save_click()
  {
    this.actionenable=true;
    this.toastr.success('Saved Successfully !')
  }
  

}





