import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PostsService } from '../posts.service';
 

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup
  categoryList: ['coding','testing'] 

  editorConfig = {
    theme: 'bubble',
    placeholder: "editor",
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  }

  constructor(private fb: FormBuilder, private postService: PostsService) { 

  }

  ngOnInit() {
    this.postService.getCategories().subscribe((c)=>{
      this.categoryList = c
    })

    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      editor: [''],
      categories: new FormArray([])
    }
      
    )
  }

   

  submitPost(){
    console.log(this.newPostForm.value)
  }


}
