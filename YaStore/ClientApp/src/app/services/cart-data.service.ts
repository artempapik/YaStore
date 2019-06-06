import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class CartDataService {
  private url: string = "/api/cart";

  constructor(private http: HttpClient) { }

  getProducts(userId: number) {
    return this.http.get(`${this.url}/${userId}`);
  }

  addProduct(userId: number, productId: number) {
    let user: User = new User();
    user.id = userId;
    user.productId = productId;
    return this.http.post(this.url, user);
  }

  buyProduct(userId: number, productId: number) {
    let user: User = new User();
    user.id = userId;
    user.productId = productId;
    return this.http.put(this.url, user);
  }

  deleteProduct(userId: number, productId: number) {
    return this.http.delete(`${this.url}/${userId}/${productId}`);
  }

  viewPurchases(userId: number) {
    return this.http.get(`${this.url}/${userId}/${1}`);
  }

  getPurchases(userId: number) {
    return this.http.get(`${this.url}/${userId}/${1}/${2}`);
  }
}
