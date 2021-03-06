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
  user: User | null;
  reqHeader: HttpHeaders;
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
    this.reqHeader = new HttpHeaders().set(
      `authorization`,
      `Bearer ${this.user?.token}`
    );
    this.getAuthenticated();
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

  createUser(user: Partial<User>) {
    return this.http.post<User>(`${this.url}auth/register`, user).pipe(
      tap((res) => {
        this.user = res;
        localStorage.setItem('auth_user_with_token', JSON.stringify(res));
        this.reqHeader = new HttpHeaders().set(
          `authorization`,
          `Bearer ${this.user?.token}`
        );
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }

  loginUser(credentials: Partial<User>) {
    return this.http.post<User>(`${this.url}auth/login`, credentials).pipe(
      tap((res) => {
        this.user = res;
        localStorage.setItem('auth_user_with_token', JSON.stringify(res));
        this.reqHeader = new HttpHeaders().set(
          `authorization`,
          `Bearer ${this.user?.token}`
        );
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
    return this.http.post(
      `${this.url}user`,
      { id: this.user.id },
      { headers: this.reqHeader }
    );
  }

  logout(e?: MouseEvent) {
    e?.preventDefault();
    localStorage.removeItem('auth_user_with_token');
    this.user = null;
    if (this.redirectUrl) {
      this.router.navigateByUrl('/');
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`, {
      headers: this.reqHeader,
    });
  }
}
