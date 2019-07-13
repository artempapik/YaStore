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
    if (this.user.password !== this.password) {
      alert(`repeat your password right`);
      return;
    }

    if (this.users !== undefined) {
      if (this.users.length > 0) {
        for (let user of this.users) {
          if (this.user.login === user.login) {
            alert(`user with this login already exists`);
            return;
          }
        }
      }
    }

    this.userDataService
      .createUser(this.user)
      .subscribe();
    this.router.navigate(['signing']);
  }
}
