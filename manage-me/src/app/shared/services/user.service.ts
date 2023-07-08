import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._baseUrl}/users`);
  }
}