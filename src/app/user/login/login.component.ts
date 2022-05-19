import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';

import { Color, AuthResp, User } from 'src/app/models/types';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertMsg = 'please wait...';
  alertColor = Color.BLUE;
  inSubmission = false;

  constructor(private auth: AuthService, private modal: ModalService) {}

  ngOnInit(): void {}

  login() {
    this.showAlert = true;
    this.inSubmission = true;
    this.auth
      .loginUser(this.credentials)
      .pipe(
        delay(1000),
        tap((res) => {
          this.inSubmission = false;
          const status = (res as HttpErrorResponse).status;
          if (status) {
            this.alertMsg =
              (res as HttpErrorResponse).error.message ||
              (res as HttpErrorResponse).statusText;
            this.alertColor = Color.RED;
            return;
          }
          this.alertMsg = 'success!';
          this.alertColor = Color.GREEN;
        }),
        delay(1000),
        tap((res) => {
          this.showAlert = false;
          this.alertMsg = 'please wait...';
          this.alertColor = Color.BLUE;
          if ((res as User).token) {
            this.modal.toggleVisible('authForm');
          }
        })
      )
      .subscribe();
  }
}
