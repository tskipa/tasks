import { Component, Input } from '@angular/core';

import { Color } from 'src/app/models/types';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() color = Color.BLUE;
  alertColor = {
    red: 'bg-red-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400',
  };

  getColor() {
    return this.alertColor[this.color];
  }
}
