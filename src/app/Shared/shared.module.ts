import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmpRoleUserPipe } from './emp-role-user.pipe';


@NgModule({
  declarations: [
   HeaderComponent,
   FooterComponent


  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
