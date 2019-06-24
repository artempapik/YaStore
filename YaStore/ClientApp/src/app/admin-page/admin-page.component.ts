import { ShareDataService } from '../services/share-data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html'
})

export class AdminPageComponent {
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
