import { ShareDataService } from '../services/share-data.service';
import { UserDataService } from '../services/user-data.service';
import { CartDataService } from '../services/cart-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { User } from '../services/user';
import { Purchase } from '../services/purchase';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {
  products: Product[];
  users: User[];

  constructor(
    private shareDataService: ShareDataService,
    private userDataService: UserDataService,
    private cartDataService: CartDataService
  ) { }

  ngOnInit() {
    let products: Product[] = [];
    let boughtProducts: Purchase[] = [];
    let resultProducts: Product[] = [];
    let exists: boolean;

    this.userDataService
      .getUsers()
      .subscribe(
        (data: User[]) => this.users = data,
        _ => { },
        () => {
          for (let user of this.users) {
            if (user.login === this.shareDataService.userName) {
              this.cartDataService
                .getProducts(user.id)
                .subscribe((data: Product[]) => products = data,
                _ => { },
                () => {
                  this.cartDataService
                    .viewPurchases(user.id)
                    .subscribe((data: Product[]) => boughtProducts = data,
                      _ => { },
                      () => {
                        for (let product of products) {
                          for (let boughtProduct of boughtProducts) {
                            if (boughtProduct.id === product.id) {
                              exists = true;
                              break;
                            }
                          }
                          if (!exists) {
                            resultProducts.push(product);
                          }
                          exists = false;
                        }
                        this.products = resultProducts;
                      });
                });
            }
          }
        }
    );
  }

  buy(index: number, productId: number) {
    this.products.splice(index, 1);

    for (let user of this.users) {
      if (user.login === this.shareDataService.userName) {
        this.cartDataService
          .buyProduct(user.id, productId)
          .subscribe();
        break;
      }
    }
  }

  delete(index: number, productId: number) {
    this.products.splice(index, 1);

    for (let user of this.users) {
      if (user.login === this.shareDataService.userName) {
        this.cartDataService
          .deleteProduct(user.id, productId)
          .subscribe();
        break;
      }
    }
  }
}
