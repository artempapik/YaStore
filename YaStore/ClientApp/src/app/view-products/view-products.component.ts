import { CategoryDataService } from '../services/category-data.service';
import { ProductDataService } from '../services/product-data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category';
import { Product } from '../services/product';

@Component({
  selector: 'view-products',
  templateUrl: './view-products.component.html'
})

export class ViewProductsComponent implements OnInit {
  products: Product[];
  product: Product = new Product();
  type: CategoryType;
  categories: Category[];
  result: Category[];
  selectedCategories: string[];
  showAdd: boolean = false;

  constructor(
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService
  ) { }

  ngOnInit() {
    this.productDataService
      .getProducts()
      .subscribe((data: Product[]) => this.products = data);
  }

  showAddProduct() {
    this.showAdd = !this.showAdd;
  }

  changeCategory() {
    this.categoryDataService
      .getCategoriesWithType(this.type)
      .subscribe((data: Category[]) => this.categories = data);
  }

  categoriesSelected() {
    let res: Category[] = [];

    for (let selectedCategory of this.selectedCategories) {
      for (let category of this.categories) {
        if (selectedCategory === category.name) {
          res.push(category);
          break;
        }
      }
    }

    this.result = res;
  }

  addProduct() {
  /* validation */

    if (this.product.price === undefined) {
      alert(`enter price`);
      return;
    }

    if (this.product.price <= 0) {
      alert(`price must be > 0`);
      return;
    }

    if (this.product.name === undefined) {
      alert(`enter name`);
      return;
    }

    this.product.name = this.product.name.trim();

    if (this.product.name.length < 3) {
      alert(`enter name at least with 3 symbols`);
      return;
    }

    if (this.product.availability === undefined) {
      alert(`enter if product is available`);
      return;
    }

    if (this.selectedCategories === undefined) {
      alert(`select at least 1 category`);
      return;
    }

  /* */

    let ids: number[] = [];

    for (let i of this.result) {
      ids.push(i.id);
    }

    this.productDataService
      .createProduct(this.product, ids)
      .subscribe();
    alert(`added`);
  }
}
