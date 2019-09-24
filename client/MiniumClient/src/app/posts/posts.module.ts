import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostListingComponent } from './post-listing/post-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../sharedmodules/material.module';
import { QuillModule } from 'ngx-quill';
import { CommentsComponent } from './comments/comments.component'
import { CategoriesComponent } from './categories/categories.component'
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:'newpost', component: NewPostComponent, canActivate: [AuthGuard]},
  {path:'categories',component:CategoriesComponent},
  {path:':postId', component: SinglePostComponent},
  {path:'', component: PostListingComponent}
]


@NgModule({
  declarations: [NewPostComponent, SinglePostComponent, PostListingComponent, CategoriesComponent, CommentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    QuillModule.forRoot()
  ], 
  providers: [AuthGuard]
})
export class PostsModule { }
