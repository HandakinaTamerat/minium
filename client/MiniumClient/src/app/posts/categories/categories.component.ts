import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/sharedmodules/category.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/sharedmodules/user.models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories:Category[];
  public selectedCategories:string[]=[];
  constructor(private service:PostsService,private route:Router,private auth:AuthService) { }

  ngOnInit() {
    this.getCategories();

  }

  async getCategories() {
    try {
      const val = await this.service.getCategories();
      this.categories=val;
      console.log(JSON.parse(this.auth.getUser()));
      for(let each of JSON.parse(this.auth.getUser()).categories) {
        this.selectedCategories.push(each);
      }
    } catch(e) {
      console.log(e);
    }
  }

  onCategorySelect(category){
    if(this.categories[category]._id){
      const selCat=this.categories[category]._id;
      if(this.selectedCategories.includes(selCat)){
        //remove category
        this.selectedCategories=this.selectedCategories.filter(cat=> cat!=selCat   );
      }else{
        //add category
        this.selectedCategories.push(selCat)
      }
      const user=JSON.parse(this.auth.getUser());
      user.categories=this.selectedCategories;
      this.auth.upDateUser(user).subscribe(data=>{
        console.log(data);
        this.auth.storeUser(JSON.stringify(user));
      },err=>{
        console.log(err);
      });
    }

  }



}
