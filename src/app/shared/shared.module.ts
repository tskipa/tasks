import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { ModalService } from '../services/modal.service';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    ModalComponent,
    AlertComponent,
    InputComponent,
    SelectComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModalComponent, AlertComponent, InputComponent, SelectComponent],
  providers: [ModalService],
})
export class SharedModule {}
