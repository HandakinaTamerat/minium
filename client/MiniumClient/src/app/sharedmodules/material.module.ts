import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatGridListModule,
  MatProgressBarModule,
  MatChipsModule,
  MatExpansionModule,
  MatDividerModule,
  MatPaginatorModule,
  MatIconModule
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
  MatChipsModule,
  MatExpansionModule,
  MatDividerModule,
  MatPaginatorModule,
  MatIconModule

  ];

  @NgModule({
  imports: modules,
  exports: modules,
  })
export class MaterialModule { }
