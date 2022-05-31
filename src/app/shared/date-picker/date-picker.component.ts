import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = false;
  month: number;
  year: number;
  numOfDays = [] as number[];
  blankdays = [] as number[];

  constructor() {
    console.log(this.control);

    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.control.setValue(
      new Date(this.year, this.month, today.getDate()).toDateString()
    );
  }

  ngOnInit(): void {
    this.getNoOfDays();
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    this.control.setValue(selectedDate.toDateString());
    this.showDatepicker = false;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.numOfDays = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;
}
