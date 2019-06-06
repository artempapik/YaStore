import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserDataService {
  private url: string = "/api/users";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.url);
  }

  createUser(user: User) {
    return this.http.post(this.url, user);
  }

  updateUser(user: User) {
    return this.http.put(this.url, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
