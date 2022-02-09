import { PhysicianModule } from "./physician/physician.module";
import { SharedModule } from "./shared/shared.module";
import { PatientModule } from "./patient/patient.module";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { NurseModule } from "./nurse/nurse.module";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    LoginModule,
    PatientModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PatientModule,
    SharedModule,
    NurseModule,
    AdminModule,
    PhysicianModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
