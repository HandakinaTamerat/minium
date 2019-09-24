import { Component, OnInit, Input } from '@angular/core';
import { Post, Comment } from 'src/app/sharedmodules/posts.models';
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/sharedmodules/user.models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() post:Post

  loading: boolean = false;
  errorOccured: boolean = false;
  successfullPost: boolean = false;
  errorMessage: string;


  constructor(private postService: PostsService, private fb: FormBuilder) { }

  commentForm: FormGroup
  
  ngOnInit() {
  this.createForm();
  }

  createForm(){
    this.commentForm = this.fb.group({
      body: ['', Validators.required]
    })
  }

  resetForm() {
    this.errorMessage = ""
    this.errorOccured = false
    this.successfullPost = false;
    this.loading = false;

    this.createForm()
  }
  postSuccess(id) {
    
    this.loading = false;
    this.errorOccured = false;
  }
  postError() {
    this.loading = false;
    this.errorOccured = true;
    this.errorMessage = "Error occured please try again";
  }

  saveComment(){
    let comment: Comment = new Comment()
    comment.body = this.commentForm.controls['body'].value
    comment.user = new User()

    console.log(comment)
    this.loading = true;
    // this.postService.newPost(this.newPostForm.value).subscribe(
    //   (res) => {
    //     this.postSuccess(res.json()['id'])

    //   },
    //   (err) => {
    //     this.postError()
    //   }
  }



}
