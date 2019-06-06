import { CategoryDataService } from '../services/category-data.service';
import { Category } from '../services/category';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html'
})

export class AddCategoryComponent {
  category: Category = new Category();

  constructor(private dataService: CategoryDataService, private router: Router) { }

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

    this.dataService
      .createCategory(this.category)
      .subscribe();
    this.router.navigate(['']);
  }
}
