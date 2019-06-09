import { ShareDataService } from '../services/share-data.service';
import { UserDataService } from '../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  user: User = new User();
  users: User[];
  notRepeatRight: boolean;
  theSamePassword: boolean;
  incorrectOld: boolean;
  succesfullyChanged: boolean;

  constructor(
    private userDataService: UserDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  changePassword() {
    this.notRepeatRight = this.user.password !== this.newPassword;

    if (this.notRepeatRight) {
      return;
    }

    this.theSamePassword =
      this.oldPassword === this.newPassword ||
      this.oldPassword === this.user.password;

    if (this.theSamePassword) {
      return;
    }

    this.user.login = this.shareDataService.userName;

    for (let user of this.users) {
      if (user.login === this.user.login) {
        this.incorrectOld = user.password !== this.oldPassword;

        if (this.incorrectOld) {
          return;
        }

        this.user.id = user.id;
        this.userDataService
          .updateUser(this.user)
          .subscribe();

        this.succesfullyChanged = true;
      }
    }
  }
}
