import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories;
  constructor(private service:PostsService,private route:Router) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.getCategories()
  }

  async getCategories() {
    try {
      this.categories = await this.service.getCategories()
    } catch(e) {
      console.log(e)
    }
  }



}
