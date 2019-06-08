import { ProductDataService } from '../services/product-data.service';
import { ShareDataService } from '../services/share-data.service';
import { CartDataService } from '../services/cart-data.service';
import { UserDataService } from '../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { Purchase } from '../services/purchase';
import { Product } from '../services/product';
import { User } from '../services/user';

@Component({
  selector: 'detailed-info',
  templateUrl: './detailed-info.component.html'
})

export class DetailedInfoComponent implements OnInit {
  product: Product = new Product();
  purchases: Purchase[];
  users: User[];
  clicked: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private productDataService: ProductDataService,
    private shareDataService: ShareDataService,
    private cartDataService: CartDataService
  ) { }

  addToCart(productId: number) {
    this.cartDataService
      .addProduct(this.shareDataService.userId, productId)
      .subscribe();
    this.clicked = true;
  }

  ngOnInit() {
    this.productDataService
      .getProductWithId(this.shareDataService.productId)
      .subscribe((data: Product) => this.product = data);

    this.userDataService
      .getUsers()
      .subscribe(
        (data: User[]) => this.users = data,
        _ => { },
        () => {
          if (this.users.length > 0) {
            for (let user of this.users) {
              if (this.shareDataService.userName === user.login) {
                this.shareDataService.userId = user.id;

                this.cartDataService
                  .getPurchases(this.shareDataService.userId)
                  .subscribe((data: Purchase[]) => this.purchases = data,
                    _ => { },
                    () => {
                      for (let purchase of this.purchases) {
                        if (purchase.product === this.product.id) {
                          this.clicked = true;
                        }
                      }
                    });
                break;
              }
            }
          }
        }
    );
  }
}
