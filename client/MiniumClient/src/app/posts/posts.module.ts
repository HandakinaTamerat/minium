import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostListingComponent } from './post-listing/post-listing.component';



@NgModule({
  declarations: [NewPostComponent, SinglePostComponent, PostListingComponent],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
