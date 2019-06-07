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

  constructor(
    private categoryDataService: CategoryDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.categoryDataService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);
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

    this.categoryDataService
      .createCategory(this.category)
      .subscribe(_ => { }, _ => { }, () => {
        this.categoryDataService
          .getCategories()
          .subscribe((data: Category[]) => this.categories = data)
      });

    alert(`added`);
  }

  changeCategory(categoryId: number) {
    this.shareDataService.categoryId = categoryId;
  }

  deleteCategory(categoryId: number) {
    this.categoryDataService
      .deleteCategory(categoryId)
      .subscribe();
  }
}
