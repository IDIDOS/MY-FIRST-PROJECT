import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: IUser[] = []

  public deleteUser(id: number): void {
    this.users.splice(id, 1)
  }
  public createUser(user: IUser): void {
    this.users.push(user);
  }
  public editUser(userInfo: IUser): void {
    const index = this.users.findIndex(user => user.id === userInfo.id);
    if (index) {
      this.users[index] = { ...this.users[index], ...userInfo };
    }

  }
}