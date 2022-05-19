import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../services/task.service';
import { Task } from '../models/types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Observable<Task[]>;

  constructor(taskService: TaskService) {
    this.tasks = taskService.getTasks();
  }

  ngOnInit(): void {}

  addTask(e: Event) {
    e.preventDefault();
  }

  editTask(e: Event, task: Task) {
    e.preventDefault();
    console.log(task);
  }

  deleteTask(e: Event, task: Task) {
    e.preventDefault();
    console.log(task);
  }
}
