import { UserDataService } from '../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html'
})

export class CreateAccountComponent implements OnInit {
  user: User = new User();
  users: User[];
  password: string;
  userExists: boolean;
  notRepeatRight: boolean;

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  addUser() {
    this.notRepeatRight = this.user.password !== this.password;

    if (this.users !== undefined) {
      if (this.users.length > 0) {
        for (let user of this.users) {
          if (this.user.login === user.login) {
            this.userExists = true;
            return;
          }
        }
        this.userExists = false;
      }
    }

    if (this.notRepeatRight) {
      return;
    }

    this.userDataService
      .createUser(this.user)
      .subscribe();
    this.router.navigate(['signing']);
  }
}
