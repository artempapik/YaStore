import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable()
export class ProductDataService {
  private url: string = "/api/products";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.url);
  }

  getProductsWithCategoryId(id: number) {
    return this.http.get(`${this.url}/categoryId/${id}`);
  }

  getProductsWithCategoryType(type: CategoryType) {
    return this.http.get(`${this.url}/type/${type}`);
  }

  getProductWithId(id: number) {
    return this.http.get(`${this.url}/productId/${id}`);
  }

  createProduct(product: Product, ids: number[]) {
    product.ids = ids;
    return this.http.post(this.url, product);
  }

  updateProduct(product: Product) {
    return this.http.put(this.url, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
