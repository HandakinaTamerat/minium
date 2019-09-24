import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'',component:LandingpageComponent, canActivate: [AuthGuard]},
  {path:'users',loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)},
  {path:'posts',loadChildren:()=>import('./posts/posts.module').then(m=>m.PostsModule), canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
