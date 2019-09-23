import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/sharedmodules/posts.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup
  categoryList: any[] = [{ name: 'coding' }, { name: 'testing' }]

  editorStyle = {
    height: '300px!important;'
  }

  loading: boolean = false;
  errorOccured: boolean = false;
  successfullPost: boolean = false;
  errorMessage: string;


  constructor(private fb: FormBuilder, private postService: PostsService, private router: Router) {

  }

  ngOnInit() {
    this.createForm()
  }

  async createForm() {
    try {
      //this.categoryList = await this.postService.getUserData()

      const formControls = this.categoryList.map(control => new FormControl(false));
      let userData = this.postService.getUserData();

      this.newPostForm = this.fb.group({
        title: ['', Validators.required],
        user: [userData],
        content: ['', Validators.required],
        categoriesMappings: new FormArray(formControls),
        categories: ['']
      }

      )
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
      .map((v, i) => v ? this.categoryList[i].name : null)
      .filter(v => v !== null);

    this.newPostForm.controls['categories'].setValue(selectedCategories)

    this.loading = true;
    this.postService.newPost(this.newPostForm.value).subscribe(
      (res) => {
        this.postSuccess(res.json()['id'])

      },
      (err) => {
        this.postError()
      }
    )

    console.log(this.newPostForm.value)
  }


}
