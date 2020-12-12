import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Array<any>;
  getCategoriesSub: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getCategoriesSub = this.postService.getCategories().subscribe(categories => {
      if (categories.length > 0) {
        this.categories = categories;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getCategoriesSub) this.getCategoriesSub.unsubscribe();
  }


}
