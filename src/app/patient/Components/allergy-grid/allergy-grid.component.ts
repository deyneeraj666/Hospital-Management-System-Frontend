import { Component, Input, OnInit } from '@angular/core';
import { Allergy } from 'src/app/Models/Allergy';
import { PmsService } from 'src/app/Service/pms.service';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-allergy-grid',
  templateUrl: './allergy-grid.component.html',
  styleUrls: ['./allergy-grid.component.css'],
})
export class AllergyGridComponent implements OnInit {
  @Input()
  allergies: Allergy[] = [];
  id: number = 0;
  pid:string="";

  constructor(private service: PmsService, private auth:AuthService) {}

  ngOnInit(): void {
    this.pid=this.auth.Id;
  }

  //to delete particular allergy added
  onDelete(id: number) {
   if( confirm("Are you sure you want to delete?"))
    {
      this.service.deletePatientAllergy(id).subscribe(
        (res) => {
          let index: number = this.allergies.findIndex((x) => x.allergyId == id);
          this.allergies.splice(index, 1);
        },
        (err) => {
          console.log(err);
          
        }
      );
    }

    
  }
}
