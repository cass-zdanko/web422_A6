import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { }

  blogPost: BlogPost;
  tags: string;
  querySub: any;
  submitSub: any;

  ngOnInit(): void {
    this.querySub = this.postService.getPostbyId(this.route.snapshot.params['id']).subscribe(post => {
      this.blogPost = post;
      this.tags = this.blogPost.tags.toString();
    });

  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.submitSub = this.postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }

  deletePost(id) {
    this.submitSub = this.postService.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }

}
