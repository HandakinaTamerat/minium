import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './sharedmodules/material.module';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ["minium.com"],
        blacklistedRoutes: ["notminium.com"]
      }
    })
  ],
  providers: [
    AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
