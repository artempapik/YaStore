import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html'
})

export class ViewUsersComponent implements OnInit {
  users: User[];

  constructor(
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.userDataService
      .getUsers()
      .subscribe((data: User[]) => this.users = data);
  }
}
