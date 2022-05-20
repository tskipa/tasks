import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, tap } from 'rxjs/operators';

import { Color, User } from 'src/app/models/types';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { PasswordMatch } from '../validators/password-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);

  showAlert = false;
  alertMsg = 'please wait...';
  alertColor = Color.BLUE;
  inSubmission = false;
  readonly roles = ['admin', 'editor', 'subscriber'];

  constructor(private auth: AuthService, private modal: ModalService) {}

  registrationForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    [PasswordMatch.verify]
  );

  ngOnInit(): void {}

  register() {
    this.showAlert = true;
    this.inSubmission = true;
    this.auth
      .createUser(this.registrationForm.value)
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
