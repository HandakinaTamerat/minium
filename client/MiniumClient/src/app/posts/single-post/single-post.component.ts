import { Component, OnInit } from '@angular/core';
import { Post, HighFive, Comment } from 'src/app/sharedmodules/posts.models';
import { User } from 'src/app/sharedmodules/user.models';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postId: string;

  panelOpenState = false
  post: Post
  showComments: boolean = false
  constructor(private postService: PostsService, private route: ActivatedRoute) {
      route.params.subscribe((param)=>{
        this.postId = param.postId
        console.log("id:")
        console.log(this.postId)
      })
   }

  ngOnInit() {
    
    this.getPost()

       
  }
  async getPost(){
    try{
      this.post = await this.postService.getPost(this.postId)
      console.log(this.post)
    }
    catch(e){
      console.log(e)
    }
  }

  highfive(){
    //this.post.highFives.push( {'user': new User(), 'createdAt': new Date()})
    this.postService.highFive(this.postId).subscribe(
      res=>{
        console.log(res)
        this.post.highFives = res.highFives
      },
      err=>{
        console.log(err)
      }
    
    )
  }

}
