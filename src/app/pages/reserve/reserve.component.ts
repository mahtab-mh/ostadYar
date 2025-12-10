import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

// 👇👇 اضافه شد
import { JalaliDatepickerComponent } from '../detePicker.compomemt/datePiker.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    JalaliDatepickerComponent,   // 👈👈 اضافه شد
  ],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReservationComponent {
  
  selectedDate: string | null = null;

  daySlots: any[] = [];

  reserveDialog = false;
  selectedSlot: any = null;
  selectedRoom: any = null;

  // دریافت تاریخ انتخاب‌شده از کامپوننت شمسی
  onDateSelected(date: string) {
    this.selectedDate = date;
    this.loadDaySlots();
  }

  loadDaySlots() {
    if (!this.selectedDate) return;

    this.daySlots = [
      {
        time: "۸:۰۰ - ۱۰:۰۰",
        rooms: [
          { name: "سالن ۱", reserved: false },
          { name: "سالن ۲", reserved: true },
        ]
      },
      {
        time: "۱۰:۰۰ - ۱۲:۰۰",
        rooms: [
          { name: "سالن ۳", reserved: false },
        ]
      }
    ];
  }

  selectRoom(slot: any, room: any) {
    this.selectedSlot = slot;
    this.selectedRoom = room;
    this.reserveDialog = true;
  }

  confirmReservation() {
    this.selectedRoom.reserved = true;
    this.reserveDialog = false;
  }
}
