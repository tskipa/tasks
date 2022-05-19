import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { TaskService } from '../services/task.service';
import { Role, Status, Task } from '../models/types';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.register('taskForm');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('taskForm');
  }

  isAdmin(): boolean {
    return this.authService.user?.role === Role.ADMIN;
  }

  addTask(e: Event) {
    e.preventDefault();
    this.modalService.toggleVisible('taskForm');
  }

  editTask(e: Event, task: Task) {
    e.preventDefault();
    if (task.status === Status.TODO) {
      task.status = Status.DONE;
      this.taskService
        .updateTask(task)
        .pipe(
          tap((res) => {
            const error = (res as HttpErrorResponse).error;
            if (error) {
              task.status = Status.TODO;
            }
          })
        )
        .subscribe();
    }
  }

  deleteTask(e: Event, task: Task) {
    e.preventDefault();
    this.taskService.deleteTask(task.id as string).subscribe((_res) => {
      this.taskService.tasks = this.taskService.tasks.filter(
        (t) => t.id !== task.id
      );
    });
  }
}
