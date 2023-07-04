import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) { }

  public getAllProjects(): Observable<Project[]> {
    return this._httpClient.get<Project[]>(`${this._baseUrl}/projects`);
  }
}
