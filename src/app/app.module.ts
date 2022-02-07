import { SharedModule } from "./shared/shared.module";
import { PatientModule } from "./patient/patient.module";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PatientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
