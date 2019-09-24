import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  subscription;
  constructor(private service:PostsService,private route:Router) { }

  ngOnInit() {
    this.subscription=this.service.getCategories().subscribe(data=>{
        this.categories=data;
    },err=>{
      this.route.navigate(['/users/login']);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }





}
