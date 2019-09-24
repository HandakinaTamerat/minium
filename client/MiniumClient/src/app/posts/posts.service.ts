import { Injectable } from '@angular/core';
import { Post } from '../sharedmodules/posts.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPostsUrl = `${environment.apiUrl}/posts/page`
  newPostUrl = `${environment.apiUrl}/post`
  getSinglePostUrl = `${environment.apiUrl}/:postId=`
  getUserPostsUrl = `${environment.apiUrl}/userId=`
  getCategoriesUrl = `${environment.apiUrl}/categories`
  highFiveUrl = `${environment.apiUrl}/posts/`

  constructor(public http: HttpClient) { }

  getPosts(pageNumber: number):Promise<Post[]>{
    return this.http.get<Post[]>(`${this.getPostsUrl}/${pageNumber}`).toPromise()
  }

  getUserPosts(userId: string):Promise<Post[]>{
    return this.http.get<Post[]>(this.getUserPostsUrl + userId).toPromise()
  }

  newPost(body: Post):Observable<any>{
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.newPostUrl, body)
  }

  getPost(postId: string):Promise<Post>{
    return this.http.get<Post>(this.getSinglePostUrl + postId).toPromise()
  }

  // get category lists
  getCategories():Promise<any>{
    return this.http.get<any>(this.getCategoriesUrl).toPromise()
  }

  getUserData():any{
    localStorage.getItem("user")
  }

  highFive(body: any, id: string):Observable<any>{
    return this.http.put(this.highFiveUrl + id , body)
  }

  newComment(){
    
  }


}
