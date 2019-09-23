import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';


const routes: Routes = [
  {path:'',component:LandingpageComponent},
  {path:'users',loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)},
  {path:'posts',loadChildren:()=>import('./posts/posts.module').then(m=>m.PostsModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
