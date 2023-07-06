import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) { }

  public getAllFunctionalities(): Observable<Functionality[]> {
    return this._httpClient.get<Functionality[]>(`${this._baseUrl}/functionalities`);
  }

  public addNewFunctionality<T>(form: T): Observable<T> {
    return this._httpClient.post<T>(`${this._baseUrl}/functionalities/newFunctionality`, form);
  }

  public editFunctionality<T>(functionalityId: number, form: T): Observable<Functionality> {
    return this._httpClient.put<Functionality>(`${this._baseUrl}/functionalities/${functionalityId}/update`, form);
  }

  public updateFunctionalityStatus(functionalityId: number, status: string): Observable<Functionality> {
    const body = { status: status };

    console.log('jestem');

    return this._httpClient.put<Functionality>(
      `${this._baseUrl}/functionalities/${functionalityId}/updateStatus`,
      body
    );
  }

  public deleteFunctionality(functionalityId: number): Observable<Functionality> {
    return this._httpClient.delete<Functionality>(`${this._baseUrl}/functionalities/${functionalityId}`);
  }
}
