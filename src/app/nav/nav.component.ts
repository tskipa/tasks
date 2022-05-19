import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    private modalService: ModalService,
    public authService: AuthService
  ) {}

  openModal(e: MouseEvent) {
    e.preventDefault();
    this.modalService.toggleVisible('authForm');
  }
}
