import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service'

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit, OnDestroy {

  posts: Array<BlogPost>;
  getPostsSub: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPostsSub = this.postService.getPosts(1, null, null).subscribe(posts => {
      if(posts.length > 0){
        this.posts = posts.slice(0,3);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.getPostsSub) this.getPostsSub.unsubscribe();
  }
}
