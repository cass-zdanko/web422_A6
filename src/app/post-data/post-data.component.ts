import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  querySub: any;
  post: BlogPost;
  commentName: string;
  commentText: string;
  commentSub: any;
  viewSub: any;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.querySub = this.postService.getPostbyId(params['id']).subscribe(post => {
        this.post = post;
        this.post.views++;
        this.viewSub = this.postService.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
    if (this.commentSub) this.commentSub.unsubscribe();
    if (this.viewSub) this.viewSub.unsubscribe();
  }

  submitComment() {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });
    
    this.commentSub = this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = "";
      this.commentText = "";
    });
  }
}
