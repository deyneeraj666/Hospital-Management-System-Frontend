

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
<<<<<<< HEAD
import { HeaderComponent } from './Shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

>>>>>>> f97f5243281f1cb2db48300e66ac7fc7f04644cb

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
