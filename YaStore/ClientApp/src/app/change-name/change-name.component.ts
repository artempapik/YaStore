import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserDataService } from '../services/user-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'change-name',
  templateUrl: './change-name.component.html'
})

export class ChangeNameComponent implements OnInit {
  password: string;
  user: User = new User();
  users: User[];

  constructor(
    private userDataService: UserDataService,
    private shareDataService: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  changeName() {
    if (this.user.login === this.shareDataService.userName) {
      alert(`your new name the same as old`);
      return;
    }

    if (this.user.password !== this.password) {
      alert(`check if you repeat your password right`);
      return;
    }

    for (let user of this.users) {
      if (user.login === this.user.login) {
        alert(`user with this name already exists`);
        return;
      }
    }

    for (let user of this.users) {
      if (user.login === this.shareDataService.userName) {
        if (this.user.password !== user.password) {
          alert(`password doesn't match`);
          return;
        }

        this.user.id = user.id;
        this.userDataService
          .updateUser(this.user)
          .subscribe();

        alert(`succesfully changed`);
        this.shareDataService.userName = this.user.login;
        this.router.navigate(['']);
      }
    }
  }
}
