import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../sharedmodules/material.module';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterComponent}
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[{provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}]
})
export class UsersModule { }
