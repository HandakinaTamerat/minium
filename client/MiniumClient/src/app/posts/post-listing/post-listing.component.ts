import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/sharedmodules/posts.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit {

  public posts: Post[];
  public length: number;
  public pageNb: number = 1;

  constructor(private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPosts()
  }

  async getPosts() {
    this.posts = await this.postsService.getPosts(this.pageNb);
    this.length = this.posts.length
  }

  async navigatePagination(nb: number) {
    this.pageNb += nb
    if(this.pageNb <= 0) this.pageNb = 1
    this.router.navigate([`/posts/page/${this.pageNb}`])
    this.posts = await this.postsService.getPosts(this.pageNb);
    if(this.posts.length <= 0) {
      this.pageNb = 0
      this.navigatePagination(0)
    }
  }

}
