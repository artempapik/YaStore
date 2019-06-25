import { ShareDataService } from '../services/share-data.service';
import { UserDataService } from '../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'signing',
  templateUrl: './signing.component.html'
})

export class SigningComponent implements OnInit {
  user: User = new User();
  users: User[];
  notMatch: boolean;

  constructor(
    private dataService: UserDataService,
    private shareDataService: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data, _ => { });
  }

  signIn() {
    for (let user of this.users) {
      if (this.user.login === user.login && this.user.password === user.password) {
        this.user.role = user.role;
        this.shareDataService.userName = this.user.login;

        if (this.user.password === '1488') {
          this.shareDataService.isAdmin = true;
        }

        this.router.navigate(['']);
        return;
      }
    }

    this.notMatch = true;
  }
}
