import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../../environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient)
  private baseUrl = inject(BASE_URL_TOKEN)

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl)
  }
}
