import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Shared/interceptor.service';
import { UsermanagementService } from './Shared/usermanagement.service';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true }
  ],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
