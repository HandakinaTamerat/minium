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
  getSinglePostUrl = `${environment.apiUrl}/:postId`
  getUserPostsUrl = `${environment.apiUrl}/userId`

  constructor(public http: HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.getPostsUrl)
  }

  getUserPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.getPostsUrl)
  }

  newPost(body: Post):Observable<any>{
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.newPostUrl, body)
  }


}
