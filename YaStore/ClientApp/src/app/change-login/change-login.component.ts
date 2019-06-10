import { ShareDataService } from '../services/share-data.service';
import { UserDataService } from '../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';

@Component({
  selector: 'change-login',
  templateUrl: './change-login.component.html'
})

export class ChangeLoginComponent implements OnInit {
  password: string;
  user: User = new User();
  users: User[];
  notRepeatRight: boolean;
  theSameName: boolean;
  succesfullyChanged: boolean;
  userExists: boolean;
  notMatch: boolean;

  constructor(
    private userDataService: UserDataService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  changeLogin() {
    this.theSameName = this.user.login === this.shareDataService.userName;

    if (this.theSameName) {
      return;
    }

    this.notRepeatRight = this.user.password !== this.password;

    if (this.notRepeatRight) {
      return;
    }

    for (let user of this.users) {
      this.userExists = user.login === this.user.login;

      if (this.userExists) {
        return;
      }
    }

    for (let user of this.users) {
      if (user.login === this.shareDataService.userName) {
        this.notMatch = this.user.password !== user.password;

        if (this.notMatch) {
          return;
        }

        this.user.id = user.id;
        this.userDataService
          .updateUser(this.user)
          .subscribe();
      
        this.succesfullyChanged = true;
        this.shareDataService.userName = this.user.login;
      }
    }
  }
}
