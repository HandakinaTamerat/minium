import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../sharedmodules/material.module';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';

const routes: Routes = [
  {path:'login',component:LoginComponent}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[{provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class UsersModule { }
