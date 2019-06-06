import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ShareDataService } from './services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterContentChecked {
  private userName: string;
  private loggedIn: boolean;
  private isAdmin: boolean;
  private navigate: string;

  constructor(
    private shareDataService: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['home']);
  }

  ngAfterContentChecked() {
    this.userName = this.shareDataService.userName;
    this.loggedIn = this.userName != null;

    this.isAdmin = this.shareDataService.isAdmin;
    this.navigate = this.isAdmin ?
      "signing/admin-page" :
      "user-actions-page";
  }
}
