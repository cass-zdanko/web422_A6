import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: Array<string>;
  getTagsSub: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getTagsSub = this.postService.getTags().subscribe(tags => {
      if (tags.length > 0) {
        this.tags = tags;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getTagsSub) this.getTagsSub.unsubscribe();
  }
}
