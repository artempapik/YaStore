import { CategoryDataService } from '../services/category-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category';

@Component({
  selector: 'view-categories',
  templateUrl: './view-categories.component.html'
})

export class ViewCategoriesComponent implements OnInit {
  categories: Category[];
  category: Category = new Category();
  showAdd: boolean = false;
  categoriesExist: boolean;

  constructor(
    private categoryDataService: CategoryDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.categoryDataService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categoriesExist = data.length > 0;
        this.categories = data;
      });
  }

  changeCategoryType(type: number) {
    this.category.type = type;
  }

  showAddCategory() {
    this.showAdd = !this.showAdd;
  }

  addCategory() {
  /* validation */
    if (this.category.name === undefined) {
      alert(`enter name`);
      return;
    }

    this.category.name = this.category.name.trim();

    if (this.category.name.length < 3) {
      alert(`enter name at least with 3 symbols`);
      return;
    }

    if (this.category.type === undefined) {
      alert(`select type`);
      return;
    }
  /* */

    this.categoriesExist = true;
    this.categories.push(this.category);

    this.categoryDataService
      .createCategory(this.category)
      .subscribe();

    alert(`added`);
  }

  changeCategory(categoryId: number) {
    this.shareDataService.categoryId = categoryId;
  }

  deleteCategory(index: number, categoryId: number) {
    this.categories.splice(index, 1);
    this.categoriesExist = this.categories.length > 0;

    this.categoryDataService
      .deleteCategory(categoryId)
      .subscribe();
  }
}
