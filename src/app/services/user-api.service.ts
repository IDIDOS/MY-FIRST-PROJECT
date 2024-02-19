import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient)
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com/users'


  public getUsers() {
    return this.http.get<IUser[]>(this.BASE_URL)
  }
}
