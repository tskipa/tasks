import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, tap } from 'rxjs/operators';

import { Color, User, Task } from 'src/app/models/types';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('');
  userEmail = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);

  showAlert = false;
  alertMsg = 'please wait...';
  alertColor = Color.BLUE;
  inSubmission = false;

  users: User[] = [];
  readonly categories = ['urgent', 'default'];
  readonly statuses = ['done', 'todo'];

  constructor(
    private modal: ModalService,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.authService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  taskForm = new FormGroup({
    name: this.name,
    description: this.description,
    userEmail: this.userEmail,
    status: this.status,
    category: this.category,
  });

  ngOnInit(): void {}

  submitTask() {
    const { name, description, userEmail, status, category } =
      this.taskForm.value;
    const user = this.users.find((user) => user.email === userEmail);
    const task = {
      name,
      description,
      userId: user?.id,
      status,
      category,
      creation_date: new Date().toLocaleDateString().replace(/\//g, '-'),
    };
    this.showAlert = true;
    this.inSubmission = true;
    this.taskService
      .saveTask(task)
      .pipe(
        delay(1000),
        tap((res) => {
          this.inSubmission = false;
          const error = (res as HttpErrorResponse).error;
          if (error) {
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
          if ((res as Task).creation_date) {
            this.modal.toggleVisible('taskForm');
            this.taskService.tasks.push(res as Task);
          }
        })
      )
      .subscribe();
  }
}
