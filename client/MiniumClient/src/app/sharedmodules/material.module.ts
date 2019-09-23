import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatGridListModule,
  MatProgressBarModule,
  
} from '@angular/material';




const modules =  [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatGridListModule,
  MatProgressBarModule,
 
  
  ];

  @NgModule({
  imports: modules,
  exports: modules,
  })
export class MaterialModule { }
