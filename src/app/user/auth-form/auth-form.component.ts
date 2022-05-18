import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  public active: boolean = true;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register('authForm');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('authForm');
  }

  toggle(value: boolean) {
    this.active = value;
  }
}
