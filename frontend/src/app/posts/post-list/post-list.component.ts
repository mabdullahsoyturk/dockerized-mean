import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private postsSub: Subscription;
  public isLoading = false;
  public totalPosts = 10;
  public postsPerPage = 2;
  public pageSizeOptions = [1,2,5,10];

  constructor(public postsService: PostsService) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

}
