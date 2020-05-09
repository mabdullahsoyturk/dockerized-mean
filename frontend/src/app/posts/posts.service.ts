import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post []>();

  constructor(private httpClient:HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.httpClient.get<{_id:string, title:string, content:string}>("http://localhost:3000/api/posts/" + id);
  }

  getPosts() {
    return this.httpClient.get<{message: string, posts: any}>("http://localhost:3000/api/posts")
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(mappedPosts => {
        this.posts = mappedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.httpClient.post<{message:string, id:string}>("http://localhost:3000/api/posts", post)
      .subscribe((responseData) => {
        const id = responseData.id;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  editPost(post: Post) {
    this.httpClient.put<{message:string}>("http://localhost:3000/api/posts/" + post.id, post)
      .subscribe((responseData) => {
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(["/"]);
      });
  }

  deletePost(postId:string) {
    this.httpClient.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
          const updatedPosts = this.posts.filter(post => post.id != postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
      });
  }
}
