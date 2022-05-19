import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../services/modal.service';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ModalComponent, AlertComponent],
  imports: [CommonModule],
  exports: [ModalComponent, AlertComponent],
  providers: [ModalService],
})
export class SharedModule {}
