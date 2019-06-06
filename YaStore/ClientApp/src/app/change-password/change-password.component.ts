import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserDataService } from '../services/user-data.service';
import { ShareDataService } from '../services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
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

  changePassword() {
    if (this.user.password !== this.newPassword) {
      alert(`check if you repeat your new password right`);
      return;
    }

    if (this.oldPassword === this.newPassword ||
        this.oldPassword === this.user.password) {
      alert(`your new password the same as old`);
      return;
    }

    this.user.login = this.shareDataService.userName;

    for (let user of this.users) {
      if (user.login === this.user.login) {
        if (user.password !== this.oldPassword) {
          alert(`incorrect old password`);
          return;
        }

        this.user.id = user.id;
        this.userDataService
          .updateUser(this.user)
          .subscribe();

        alert(`succesfully changed`);
        this.router.navigate(['']);
      }
    }
  }
}
