import { CategoryDataService } from '../services/category-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category';
import { Router } from '@angular/router';

@Component({
  selector: 'change-category',
  templateUrl: './change-category.component.html'
})

export class ChangeCategoryComponent implements OnInit {
  category: Category = new Category();

  constructor(
    private categoryDataService: CategoryDataService,
    private shareDataService: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.category.id = this.shareDataService.categoryId;
  }

  changeCategory() {
    this.categoryDataService
      .updateCategory(this.category)
      .subscribe();
    alert(`changed`);
    this.router.navigate(['signing/admin-page/view-categories']);
  }
}
