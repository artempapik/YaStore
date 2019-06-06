import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'user-actions-page',
  templateUrl: 'user-actions-page.component.html'
})

export class UserActionsPageComponent {
  constructor(
    private router: Router,
    private shareDataService: ShareDataService
  ) { }

  signOut() {
    this.shareDataService.userName = null;
    this.shareDataService.isAdmin = false;
    this.router.navigate(['']);
  }
}
