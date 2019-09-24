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
  @Input() post: Post

  loading: boolean = false;
  errorOccured: boolean = false;
  successfullPost: boolean = false;
  errorMessage: string;


  constructor(private postService: PostsService, private fb: FormBuilder) { }

  commentForm: FormGroup

  ngOnInit() {
    this.createForm();
  }

  createForm() {
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
  postSuccess() {
    this.loading = false;
    this.errorOccured = false;
    this.resetForm()
    this.successfullPost = true


  }
  postError() {
    this.loading = false;
    this.errorOccured = true;
    this.successfullPost = false;
    this.errorMessage = "Error occured please try again";
  }

  saveComment() {
    let comment: Comment = new Comment()
    comment.body = this.commentForm.controls['body'].value
    comment.user = new User()

    this.loading = true;
    this.postService.addComment(this.commentForm.value).subscribe(
      res => {
   
        let com = new Comment()      
        com._id = res['_id']
        com.body = res['body']
        com.createdAt = res['createdAt']
        com.highFives = res['highFives']
        com.user = res['user']

        this.post.comments.push(com)
        this.postService.updatePost(this.post, this.post._id).subscribe(
          (res) => {
            console.log(res)
            this.postSuccess()

          },
          (err) => {
            this.postError()
          }
        )

      },
      err => {

      }
    )

  }



}
