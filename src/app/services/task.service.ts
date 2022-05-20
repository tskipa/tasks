import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Task } from '../models/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = environment.baseUrl;
  private reqHeader;
  taskCrawler = new Subject<Task>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.token
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}tasks`, {
      headers: this.reqHeader,
    });
  }

  saveTask(task: Partial<Task>) {
    return this.http
      .post<Task>(`${this.url}tasks`, task, { headers: this.reqHeader })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return of(err);
        })
      );
  }

  updateTask(task: Partial<Task>) {
    return this.http
      .put<Task>(`${this.url}tasks/${task.id}`, task, {
        headers: this.reqHeader,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return of(err);
        })
      );
  }

  deleteTask(id: string) {
    return this.http.delete<Task>(`${this.url}tasks/${id}`, {
      headers: this.reqHeader,
    });
  }
}
