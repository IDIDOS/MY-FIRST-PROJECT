import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  public saveUsers(users: IUser[]): void {
    users.map((user, index) => localStorage.setItem(index.toString(), JSON.stringify(user)))

  }

  public getUsers(): IUser[] {
    return Object.values(localStorage).map(user => JSON.parse(user))
  }

  public deleteUser(id: number): void {
    localStorage.removeItem(id.toString())

  }

}
