import { CategoryDataService } from '../services/category-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  category: Category = new Category();
  categories: Category[];

  constructor(
    private categoryDataService: CategoryDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.categoryDataService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data, _ => { });
  }

  //productsFromCategory(type: CategoryType, id: number) {
  //  this.shareDataService.categoryType = type;
  //  this.shareDataService.categoryId = id;
  //}

  productsFromCategory(type: CategoryType) {
    this.shareDataService.categoryType = type;
  }
}
