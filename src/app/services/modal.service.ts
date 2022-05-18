import { Injectable } from '@angular/core';

interface Modal {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: Modal[] = [];

  getVisibility(id: string) {
    const m = this.modals.find((e) => e.id === id);
    return m?.visible as boolean;
  }

  toggleVisible(id: string) {
    const m = this.modals.find((e) => e.id === id) as Modal;
    m.visible = !m.visible;
  }

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((e) => e.id !== id);
  }
}
