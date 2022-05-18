import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private visible = false;

  getVisibility() {
    return this.visible;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }
}
