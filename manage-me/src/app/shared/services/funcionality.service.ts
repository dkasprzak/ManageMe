import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionalityService {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) { }

  public getAllFunctionalities(): Observable<Functionality[]> {
    return this._httpClient.get<Functionality[]>(`${this._baseUrl}/functionalities`);
  }
}
