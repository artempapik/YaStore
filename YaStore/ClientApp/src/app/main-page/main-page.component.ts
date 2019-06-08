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
  fromPrice: number;
  toPrice: number;

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

  updateProductPage(index?: number) {
    this.showProductsWithCategory(index);
  }

  showProductsWithCategory(index: number) {
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
        .subscribe((data: Product[]) => this.products = data, _ => { }, () => this.showProductsWithPrice());
      return;
    }

    this.products = [];

    for (let i: number = 0; i < this.categoriesChecked.length; i++) {
      if (this.categoriesChecked[i]) {
        this.productDataService
          .getProductsWithCategoryId(this.categories[i].id)
          .subscribe((data: Product[]) => this.products.push(...data), _ => { }, () => this.showProductsWithPrice());
      }
    }
  }

  showProductsWithPrice() {
    if (this.fromPrice === undefined || this.toPrice === undefined) {
      return;
    }

    let res: Product[] = [];

    for (let i: number = 0; i < this.products.length; i++) {
      if (this.products[i].price >= this.fromPrice && this.products[i].price <= this.toPrice) {
        res.push(this.products[i]);
      }
    }

    this.products = res;
  }

  viewProduct(id: number) {
    this.shareDataService.productId = id;
  }
}
