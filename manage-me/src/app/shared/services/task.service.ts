import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) {}

  public updateTaskState(functionalityId: number, currentTask: Task) {
    console.log(currentTask);

    const payload = {
      id: currentTask.id,
      state: currentTask.state,
    };

    return this._httpClient.put(`${this._baseUrl}/functionalities/${functionalityId}/taskState`, payload);
  }

  public addNewTask<T>(form: T): Observable<T> {
    return this._httpClient.post<T>(`${this._baseUrl}/functionalities/newTask`, form);
  }

  public editTask<T>(functionalityId: number, taskId: number, form: T): Observable<T> {
    return this._httpClient.put<T>(`${this._baseUrl}/functionalities/${functionalityId}/editTask/${taskId}`, form);
  }

  public deleteTask(functionalityId: number, taskId: number): Observable<Task> {
    return this._httpClient.delete<Task>(`${this._baseUrl}/functionalities/${functionalityId}/deleteTask/${taskId}`);
  }
}
