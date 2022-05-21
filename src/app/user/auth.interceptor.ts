import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if (
            err instanceof HttpErrorResponse &&
            (err.status === 401 || err.status === 403)
          ) {
            localStorage.removeItem('auth_user_with_token');
            this.authService.user = null;
            this.router
              .navigate(['/'], { replaceUrl: true })
              .finally(() => this.modalService.toggleVisible('authForm'));
          }
        },
      })
    );
  }
}
