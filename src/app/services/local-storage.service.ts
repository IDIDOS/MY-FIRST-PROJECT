import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCAL_STORAGE_USERS_KEY } from '../../environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly usersKey = inject(LOCAL_STORAGE_USERS_KEY)

  public saveUsers(users: IUser[]): Observable<IUser[]> {
    localStorage.setItem(this.usersKey, JSON.stringify(users) as string)
    return of(users);
  }

  public getUsers(): Observable<IUser[]> {
    let users = localStorage.getItem(this.usersKey) as string;
    return of(JSON.parse(users))
  }

  public addUser(user: IUser): Observable<IUser> {
    let usersArray = JSON.parse(localStorage.getItem(this.usersKey) as string) as IUser[]
    let newUsersArray = Array.from(usersArray);
    newUsersArray = [...usersArray, user];
    localStorage.setItem(this.usersKey, JSON.stringify(newUsersArray));
    return of(user)
  }

  public deleteUser(id: number): Observable<number> {
    let allUsers = localStorage.getItem(this.usersKey) as string
    let usersArray = JSON.parse(allUsers) as IUser[]
    let newUsersArray = Array.from(usersArray).filter(user => user.id !== id)
    localStorage.setItem(this.usersKey, JSON.stringify(newUsersArray))
    return of(id)
  }

  public editUser(editedUser: IUser): Observable<IUser> {
    let usersArray = JSON.parse(localStorage.getItem(this.usersKey) as string) as IUser[]
    let newUsersArray = Array.from(usersArray);
    newUsersArray = newUsersArray.map(user => user.id === editedUser.id ? editedUser : user)
    localStorage.setItem(this.usersKey, JSON.stringify(newUsersArray))
    return of(editedUser)
  }

}
