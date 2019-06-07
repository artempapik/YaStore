import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../services/category-data.service';
import { Category } from '../services/category';
import { ShareDataService } from '../services/share-data.service';
import { ProductDataService } from '../services/product-data.service';
import { Product } from '../services/product';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {
  categories: Category[];
  products: Product[];

  constructor(
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.categoryDataService
      .getCategoriesWithType(this.shareDataService.categoryType)
      .subscribe((data: Category[]) => this.categories = data, _ => { });

    if (this.shareDataService.showProductsFromCategory) {
      this.productDataService
        .getProductsWithCategoryId(this.shareDataService.categoryId)
        .subscribe((data: Product[]) => this.products = data, _ => { });
    } else {
      this.productDataService
        .getProductsWithCategoryType(this.shareDataService.categoryType)
        .subscribe((data: Product[]) => this.products = data, _ => { });
    }
  }

  viewProduct(id: number) {
    this.shareDataService.productId = id;
  }
}
