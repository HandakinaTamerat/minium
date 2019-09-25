import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/sharedmodules/posts.models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup
  categoryList: any[] = []

  loading: boolean = false;
  errorOccured: boolean = false;
  successfullPost: boolean = false;
  errorMessage: string;


  constructor(private fb: FormBuilder, private postService: PostsService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.createForm()
  }

  async createForm() {
    try {
            
      let formControls = this.categoryList.map(control => new FormControl(false));
     
      this.newPostForm = this.fb.group({
        title: ['', Validators.required],
        subTitle: ['', Validators.required],
        user: [''],
        content: ['', Validators.required],
        categoriesMappings: new FormArray(formControls),
        category: ['']
      }

      )

      this.categoryList = await this.postService.getCategories()
      console.log(this.categoryList)
      formControls = this.categoryList.map(control => new FormControl(false));
      formControls.forEach((elem)=>{
        (this.newPostForm.get('categoriesMappings') as FormArray).push(elem)
      })
      
      

    }
    catch (e) {

    }

  }

  resetForm() {
    this.errorMessage = ""
    this.errorOccured = false
    this.successfullPost = false;
    this.loading = false;

    this.createForm()
  }
  postSuccess(id) {
    this.router.navigate['/posts/' + id]
    this.loading = false;
    this.errorOccured = false;
  }
  postError() {
    this.loading = false;
    this.errorOccured = true;
    this.errorMessage = "Error occured please try again";
  }


  submitPost() {
    const selectedCategories = this.newPostForm.value.categoriesMappings
      .map((v, i) => v ? this.categoryList[i]._id : null)
      .filter(v => v !== null);

    this.newPostForm.controls['category'].setValue(selectedCategories)
    this.newPostForm.controls['user'].setValue(this.authService.getUser()['_id'])

    this.loading = true;

    this.postService.newPost(this.newPostForm.value).subscribe(
      (res) => {
        console.log("response:")
        console.log(res)
        this.postSuccess(res['_id'])
      },
      (err) => {
        this.postError()
      }
    )

    console.log(this.newPostForm.value)
  }


}
