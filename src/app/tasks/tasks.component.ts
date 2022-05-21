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
  tasks: Task[] = [];
  allUserTasks: Task[] = [];
  checked = true;

  constructor(
    public taskService: TaskService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.register('taskForm');
    this.taskService.getTasks().subscribe((res) => {
      this.allUserTasks = res;
      this.tasks = this.allUserTasks.filter(
        (task) => task.userId === this.authService.user?.id
      );
    });
    this.taskService.taskCrawler.subscribe((newTask) => {
      this.allUserTasks.push(newTask);
      this.tasks = this.allUserTasks.filter(
        (task) => !this.checked || task.userId === this.authService.user?.id
      );
    });
  }

  toggleTasks() {
    this.checked = !this.checked;
    this.tasks = this.allUserTasks.filter(
      (task) => !this.checked || task.userId === this.authService.user?.id
    );
  }

  ngOnDestroy(): void {
    this.modalService.unregister('taskForm');
  }

  isAdmin(): boolean {
    return this.authService.user?.role === Role.ADMIN;
  }

  isEditor(): boolean {
    return this.authService.user?.role === Role.EDITOR;
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

  deleteTask(e: Event, removedTask: Task) {
    e.preventDefault();
    this.taskService.deleteTask(removedTask.id as string).subscribe(() => {
      this.allUserTasks = this.allUserTasks.filter(
        (task) => task.id !== removedTask.id
      );
      this.tasks = this.allUserTasks.filter(
        (task) => !this.checked || task.userId === this.authService.user?.id
      );
    });
  }
}
