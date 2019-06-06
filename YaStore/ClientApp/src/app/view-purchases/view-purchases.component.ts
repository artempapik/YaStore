import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ProductDataService } from '../services/product-data.service';
import { ShareDataService } from '../services/share-data.service';
import { CartDataService } from '../services/cart-data.service';
import { User } from '../services/user';
import { Product } from '../services/product';

@Component({
  selector: 'view-purchases',
  templateUrl: './view-purchases.component.html'
})

export class ViewPurchasesComponent {
  products: Product[];
  users: User[];

  constructor(
    private userDataService: UserDataService,
    private shareDataService: ShareDataService,
    private cartDataService: CartDataService
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe(
        (data: User[]) => this.users = data,
        _ => { },
        () => {
          for (let user of this.users) {
            if (user.login === this.shareDataService.userName) {
              this.cartDataService
                .viewPurchases(user.id)
                .subscribe((data: Product[]) => this.products = data);
            }
          }
        }
      );
  }
}
