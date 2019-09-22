import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostListingComponent } from './post-listing/post-listing.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'post', component: NewPostComponent},
  {path:':/postID', component: SinglePostComponent},
  {path:'', component: PostListingComponent}
]


@NgModule({
  declarations: [NewPostComponent, SinglePostComponent, PostListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
