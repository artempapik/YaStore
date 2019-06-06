import { ProductDataService } from '../services/product-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'change-product',
  templateUrl: './change-product.component.html'
})

export class ChangeProductComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productDataService: ProductDataService,
    private shareDataService: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.product.id = this.shareDataService.productId;
  }

  changeProduct() {
    this.productDataService
      .updateProduct(this.product)
      .subscribe();
    alert(`changed`);
    this.router.navigate(['signing/admin-page/view-products']);
  }
}
