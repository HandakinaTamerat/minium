import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/sharedmodules/posts.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit {

  public posts: Post[];
  public length: number;
  public pageNb: number = 1;
  

  categories: []
  isLogged: boolean


  constructor(private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute,private authService: AuthService) { }

  ngOnInit() {
    this.getPosts()
    this.getCategories();

    this.isLogged = this.authService.isUserLoggedIn()

    this.authService.isLoggedEmitter.on('message',()=>{
      this.isLogged = true
    })
  }

  async getPosts() {
    this.posts = await this.postsService.getPosts(this.pageNb);
    this.length = this.posts.length
    this.posts.forEach((elm)=>{return elm['image'] = this.getImageIndex()})
 
  }
  async getCategories(){
    try{
      this.categories = await this.postsService.getCategories()
    }
    catch(e){

    }
  }

  getImageIndex(){
    return Math.floor(Math.random() * 5) + 1; 
  }
  nagivateToCategories(){
    this.router.navigate(['/posts/categories'])
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
