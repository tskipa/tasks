import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Task } from '../models/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<Task[]> {
    const reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authService.token
    );
    return this.http.get<Task[]>(`${this.url}tasks`, {
      headers: reqHeader,
    });
  }
}
