import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TasksComponent, TaskFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [TaskFormComponent],
})
export class TasksModule {}
