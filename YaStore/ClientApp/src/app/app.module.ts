//TODO
//so, maybe, for deleting category & product i should use modern many-to-many relationship
//filter on main page
//statistics
//carousel
//store pictures in some way
//angular validation

//QUESTIONS
//get different methods with the same signature
//errors with 500 code while trying to perform get request (and 200 also)
//why red classes in VS in TS

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SigningComponent } from './signing/signing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CategoryDataService } from './services/category-data.service';
import { UserDataService } from './services/user-data.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ShareDataService } from './services/share-data.service';
import { UserActionsPageComponent } from './user-actions-page/user-actions-page.component';
import { CartComponent } from './cart/cart.component';
import { ChangeLoginComponent } from './change-login/change-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { ProductDataService } from './services/product-data.service';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailedInfoComponent } from './detailed-info/detailed-info.component';
import { CartDataService } from './services/cart-data.service';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ChangeCategoryComponent } from './change-category/change-category.component';
import { ChangeProductComponent } from './change-product/change-product.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'home', component: HomeComponent },
      { path: 'signing', component: SigningComponent },
      { path: 'user-actions-page', component: UserActionsPageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'home/main-page', component: MainPageComponent },
      { path: 'signing/create-account', component: CreateAccountComponent },
      { path: 'signing/admin-page', component: AdminPageComponent },
      { path: 'user-actions-page/change-login', component: ChangeLoginComponent },
      { path: 'user-actions-page/change-password', component: ChangePasswordComponent },
      { path: 'user-actions-page/view-purchases', component: ViewPurchasesComponent },
      { path: 'home/main-page/detailed-info', component: DetailedInfoComponent },
      { path: 'signing/admin-page/view-categories', component: ViewCategoriesComponent },
      { path: 'signing/admin-page/view-products', component: ViewProductsComponent },
      { path: 'signing/admin-page/view-users', component: ViewUsersComponent },
      { path: 'signing/admin-page/view-categories/change-category', component: ChangeCategoryComponent },
      { path: 'signing/admin-page/view-products/change-product', component: ChangeProductComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SigningComponent,
    UserActionsPageComponent,
    CartComponent,
    MainPageComponent,
    CreateAccountComponent,
    AdminPageComponent,
    ChangeLoginComponent,
    ChangePasswordComponent,
    ViewPurchasesComponent,
    DetailedInfoComponent,
    ViewCategoriesComponent,
    ViewProductsComponent,
    ViewUsersComponent,
    ChangeCategoryComponent,
    ChangeProductComponent,
    NotFoundComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    CategoryDataService,
    UserDataService,
    ProductDataService,
    ShareDataService,
    CartDataService
  ]
})

export class AppModule { }
