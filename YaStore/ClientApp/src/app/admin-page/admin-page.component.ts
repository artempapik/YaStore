import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html'
})

export class AdminPageComponent {
  constructor(private router: Router, private share: ShareDataService) { }

  signOut() {
    this.share.userName = null;
    this.share.isAdmin = false;
    this.router.navigate(['']);
  }
}
