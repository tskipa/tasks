import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalId = '';
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  closeModal(e: MouseEvent) {
    e.preventDefault();
    this.modalService.toggleVisible(this.modalId);
  }
}
