import { Injectable } from '@angular/core';
import { Post } from '../sharedmodules/posts.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPostsUrl = `${environment.apiUrl}/posts`
  newPostUrl = `${environment.apiUrl}/post`
  getSinglePostUrl = `${environment.apiUrl}/:postId=`
  getUserPostsUrl = `${environment.apiUrl}/userId=`
  getCategoriesUrl = `${environment.apiUrl}/categories`
  highFiveUrl = `${environment.apiUrl}/highFiveUrl`

  constructor(public http: HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.getPostsUrl)
  }

  getUserPosts(userId: string):Observable<Post[]>{
    return this.http.get<Post[]>(this.getUserPostsUrl + userId)
  }

  newPost(body: Post):Observable<any>{
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.newPostUrl, body)
  }

  getPost(postId: string):Observable<Post>{
    return this.http.get<Post>(this.getSinglePostUrl + postId)
  }

  // get category lists
  getCategories():Observable<any>{
    return this.http.get<any>(this.getCategoriesUrl)
  }

  getUserData():any{
    localStorage.getItem("user")
  }

  highFive(body: any):Observable<any>{
    return this.http.patch(this.highFiveUrl , body)
  }


}
