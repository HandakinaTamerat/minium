import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/sharedmodules/posts.models';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit {

  public posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts()
  }

  async getPosts() {
    this.posts = await this.postsService.getPosts();
  }

}
