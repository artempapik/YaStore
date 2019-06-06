import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable()
export class CategoryDataService {
  private url: string = "/api/categories";

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.url);
  }

  getCategoriesWithType(type: CategoryType) {
    return this.http.get(`${this.url}/${type}`);
  }

  createCategory(category: Category) {
    return this.http.post(this.url, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
