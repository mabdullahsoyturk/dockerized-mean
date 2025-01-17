import { Component, OnInit} from '@angular/core';
import { Post } from "../post.model";
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public mode = "create";
  private postId: string;
  private userId: string;
  public post: Post = {
    id: "",
    title: "",
    content: "",
    creator: ""
  };

  public isLoading = false;



  constructor(public postsService: PostsService, public route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content, creator: postData.creator};
        });

      }else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      console.log("Add Form is invaid");
      return;
    }

    this.isLoading = true;
    if(this.mode == "create") {
      const post: Post = { id: null, title:form.value.title, content:form.value.content, creator: this.userId};
      this.postsService.addPost(post);
    } else {
      const post: Post = { id: this.postId, title: form.value.title, content: form.value.content, creator: this.userId };
      this.postsService.editPost(post);
    }

    //this.router.navigate(['']);
  }
}
