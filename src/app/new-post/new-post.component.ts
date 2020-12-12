import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {

  blogPost: BlogPost = new BlogPost();
  tags: string;
  submitSub: any;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.submitSub) this.submitSub.unsubscribe();
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;

    this.submitSub = this.postService.newPost(this.blogPost).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }
}
