import { CategoryDataService } from '../services/category-data.service';
import { ProductDataService } from '../services/product-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category';
import { Product } from '../services/product';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {
  categories: Category[];
  categoriesChecked: boolean[] = [];
  products: Product[];
  productsExist: boolean;

  constructor(
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.categoryDataService
      .getCategoriesWithType(this.shareDataService.categoryType)
      .subscribe((data: Category[]) => {
        this.categoriesChecked.length = data.length;
        this.categories = data;
      }, _ => { }, () => {
          if (this.shareDataService.showProductsFromCategory) {
            for (let i: number = 0; i < this.categories.length; i++) {
              if (this.categories[i].id == this.shareDataService.categoryId) {
                this.categoriesChecked[i] = true;
              }
            }
          }
      });

    if (this.shareDataService.showProductsFromCategory) {
      this.productDataService
        .getProductsWithCategoryId(this.shareDataService.categoryId)
        .subscribe((data: Product[]) => {
          this.productsExist = data.length > 0;
          this.products = data;
        }, _ => { });
    } else {
      this.productDataService
        .getProductsWithCategoryType(this.shareDataService.categoryType)
        .subscribe((data: Product[]) => {
          this.productsExist = data.length > 0;
          this.products = data;
        }, _ => { });
    }
  }

  updateProductPage(index: number) {
    this.categoriesChecked[index] = !this.categoriesChecked[index];

    let somethingChecked: boolean;

    for (let categoryChecked of this.categoriesChecked) {
      if (categoryChecked) {
        somethingChecked = true;
      }
    }

    if (!somethingChecked) {
      this.productDataService
        .getProductsWithCategoryType(this.shareDataService.categoryType)
        .subscribe((data: Product[]) => this.products = data, _ => { });

      return;
    }

    this.products = [];

    for (let i: number = 0; i < this.categoriesChecked.length; i++) {
      if (this.categoriesChecked[i]) {
        this.productDataService
          .getProductsWithCategoryId(this.categories[i].id)
          .subscribe((data: Product[]) => this.products.push(...data), _ => { });
      }
    }
  }

  viewProduct(id: number) {
    this.shareDataService.productId = id;
  }
}
