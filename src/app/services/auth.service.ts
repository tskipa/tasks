import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: Observable<boolean>;
  token: string | null;
  user: User | null;
  private url: string = environment.baseUrl;
  private redirectUrl = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(
      localStorage.getItem('auth_user_with_token') as string
    );
    this.token = this.user?.token as string;
    this.isAuthenticated = this.getAuthenticated();
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirectUrl = data['authOnly'] ?? false;
      });
  }

  loginUser(credentials: Partial<User>) {
    return this.http.post<User>(`${this.url}auth/login`, credentials).pipe(
      tap((res) => {
        this.user = res;
        this.token = res.token as string;
        this.isAuthenticated = this.getAuthenticated();
        localStorage.setItem('auth_user_with_token', JSON.stringify(res));
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }

  getAuthenticated() {
    if (!this.user) {
      return of(false);
    }
    const reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );
    return this.http
      .get(`${this.url}users/${this.user.id}`, { headers: reqHeader })
      .pipe(
        map((res) => !!res),
        catchError(() => {
          localStorage.clear();
          this.token = null;
          this.user = null;
          return of(false);
        })
      );
  }

  logout(e: MouseEvent) {
    e.preventDefault();
    localStorage.clear();
    this.token = null;
    this.user = null;
    this.isAuthenticated = this.getAuthenticated();
    if (this.redirectUrl) {
      this.router.navigateByUrl('/');
    }
  }

  getUsers(): Observable<User[]> {
    const reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );
    return this.http.get<User[]>(`${this.url}users`, {
      headers: reqHeader,
    });
  }

  getUser(id: string): Observable<User> {
    const reqHeader = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );
    return this.http.get<User>(`${this.url}users/${id}`, {
      headers: reqHeader,
    });
  }
}
