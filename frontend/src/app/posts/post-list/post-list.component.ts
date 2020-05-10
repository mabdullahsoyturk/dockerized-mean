import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private postsSub: Subscription;
  private authSub: Subscription;
  public isLoading = false;
  public totalPosts = 10;
  public postsPerPage = 2;
  public pageSizeOptions = [1,2,5,10];
  public isAuthenticated = false;
  public userId: string;

  constructor(public postsService: PostsService, public authService: AuthService) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
                        .getPostUpdateListener()
                        .subscribe((posts: Post[]) => {
                            this.isLoading = false;
                            this.posts = posts;
                        });

    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authSub = this.authService
                       .getAuthStatusListener()
                       .subscribe(isAuthenticated => {
                          this.isAuthenticated = isAuthenticated;
                          this.userId = this.authService.getUserId();
                       });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

}
