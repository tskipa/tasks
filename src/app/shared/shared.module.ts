import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { ModalService } from '../services/modal.service';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    ModalComponent,
    AlertComponent,
    InputComponent,
    SelectComponent,
    DatePickerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    ModalComponent,
    AlertComponent,
    InputComponent,
    SelectComponent,
    DatePickerComponent,
  ],
  providers: [ModalService],
})
export class SharedModule {}
