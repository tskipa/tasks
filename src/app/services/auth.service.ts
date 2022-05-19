import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Token, User } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.baseUrl;
  token: string | null = localStorage.getItem('tasks_access_token');

  constructor(private http: HttpClient) {}

  loginUser(credentials: Partial<User>) {
    return this.http.post(`${this.url}auth/login`, credentials).pipe(
      tap((res) => {
        this.token = (res as Token).access_token;
        localStorage.setItem('tasks_access_token', this.token);
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }

  verifyUser() {
    const reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );
    return this.http.get(`${this.url}verifyUser`, { headers: reqHeader }).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }
}
