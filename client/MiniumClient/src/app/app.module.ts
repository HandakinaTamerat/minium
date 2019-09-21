import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './sharedmodules/material.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    AuthModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
