import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/sharedmodules/category.models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories:Category;
  constructor(private service:PostsService,private route:Router) { }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    try {
      const val = await this.service.getCategories();
      this.categories=val;
    } catch(e) {
      console.log(e)
    }
  }



}
