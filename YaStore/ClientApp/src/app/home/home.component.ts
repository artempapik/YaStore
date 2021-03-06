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
  categoriesExist: boolean;

  constructor(
    private categoryDataService: CategoryDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.shareDataService.showProductsFromCategory = false;
    this.categoryDataService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categoriesExist = data.length > 0;
        this.categories = data;
      }, _ => { });
  }

  productsFromCategory(type: CategoryType, id: number) {
    this.shareDataService.categoryType = type;
    this.shareDataService.categoryId = id;
    this.shareDataService.showProductsFromCategory = true;
  }

  productsFromCategoryType(type: CategoryType) {
    this.shareDataService.categoryType = type;
  }
}
