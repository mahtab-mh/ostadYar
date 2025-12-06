import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JalaliDatepickerComponent } from '../detePicker.compomemt/datePiker.component';
import * as jalaali from 'jalaali-js';

type RoomKey = 'farabi' | 'ferdowsi' | 'saadi' | 'hafez' | 'khayyam' | 'molana';

interface ExamDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  room: { id: number; name: string; capacity: number };
}

interface SavedExamView {
  id: number;
  roomId: number;
  roomName: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'home-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    JalaliDatepickerComponent
  ],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReservationComponent {

  apiBase = 'https://cheap-tones-intensive-wives.trycloudflare.com/api/exams';

  /** لیست سالن‌ها */
  roomList: RoomKey[] = ['farabi', 'ferdowsi', 'saadi', 'hafez', 'khayyam', 'molana'];

  /** شماره اتاق‌ها */
  roomIds: Record<RoomKey, number> = {
    farabi: 1, ferdowsi: 2, saadi: 3, hafez: 4, khayyam: 5, molana: 6
  };

  /** کنترل مودال */
  modalVisible = false;

  /** سالن انتخاب‌شده */
  currentRoom!: RoomKey;

  /** مدل اطلاعات رزرو داخل مودال */
  currentReservation = {
    lessonName: '',
    date: '',
    startTime: '',
    endTime: ''
  };

  /** لیست رزروها */
  savedReservations: SavedExamView[] = [];

  constructor(private http: HttpClient) {
    this.loadReservationsFromApi();
  }

  // =============================
  //  دریافت لیست رزروها از بک‌اند
  // =============================
  loadReservationsFromApi() {
    this.http.get<ExamDto[]>(this.apiBase).subscribe({
      next: exams => {
        this.savedReservations = exams.map(e => this.mapExamDtoToView(e));
      },
      error: err => console.error('❌ API GET error:', err)
    });
  }

  // تبدیل مدل بک‌اند → مدل نمایشی
  private mapExamDtoToView(dto: ExamDto): SavedExamView {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    const j = jalaali.toJalaali(start.getFullYear(), start.getMonth() + 1, start.getDate());
    const pad = (n: number) => n.toString().padStart(2, '0');
    const jalaliDate = `${j.jy}/${pad(j.jm)}/${pad(j.jd)}`;

    return {
      id: dto.id,
      roomId: dto.room.id,
      roomName: dto.room.name,
      name: dto.name,
      date: jalaliDate,
      startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
      endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`
    };
  }

  // =============================
  //  بازکردن مودال رزرو سالن
  // =============================
  openModal(room: RoomKey) {
    this.currentRoom = room;
    this.modalVisible = true;

    this.currentReservation = {
      lessonName: '',
      date: '',
      startTime: '',
      endTime: ''
    };
  }

  // انتخاب تاریخ شمسی
  onDateSelected(room: RoomKey, date: string) {
    this.currentReservation.date = date;
  }

  // تبدیل تاریخ شمسی → ISO
  private jalaliToIso(jdate: string, time: string): string {
    const [jy, jm, jd] = jdate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${gy}-${pad(gm)}-${pad(gd)}T${time}:00`;
  }

  // =============================
  //  ذخیره رزرو
  // =============================
  saveDateTime() {
    const r = this.currentReservation;

    if (!r.lessonName || !r.date || !r.startTime || !r.endTime) {
      alert('همه فیلدها الزامی هستند');
      return;
    }

    const payload = {
      name: r.lessonName,
      startDate: this.jalaliToIso(r.date, r.startTime),
      endDate: this.jalaliToIso(r.date, r.endTime)
    };

    const roomId = this.roomIds[this.currentRoom];

    this.http.post(`${this.apiBase}/${roomId}`, payload).subscribe({
      next: () => {
        this.modalVisible = false;
        this.loadReservationsFromApi();
      },
      error: err => console.error('❌ API POST error:', err)
    });
  }

  // =============================
  //  حذف رزرو
  // =============================
  deleteExam(id: number) {
    if (!confirm('آیا مطمئن هستید؟')) return;

    this.http.delete(`${this.apiBase}/${id}`).subscribe({
      next: () => this.loadReservationsFromApi(),
      error: err => console.error('❌ API DELETE error:', err)
    });
  }

  // =============================
  //  توابع نمایش UI (نام و تصویر سالن)
  // =============================
  getRoomName(room: RoomKey): string {
    return {
      farabi: 'فارابی',
      ferdowsi: 'فردوسی',
      saadi: 'سعدی',
      hafez: 'حافظ',
      khayyam: 'خیام',
      molana: 'مولانا'
    }[room];
  }

  getRoomImage(room: RoomKey): string {
    return {
      farabi: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMU39gGjLpuUXCok9HrASKK4QZQYgZNxyqpw&s',
      ferdowsi: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdok9e5lq4WJOJH9GBUWEaEzFOCePZlrj7A&s',
      saadi: 'https://bonyadbidel.ir/wp-content/uploads/2025/04/photo_2025-04-21_16-54-23.jpg',
      hafez: 'https://www.beytoote.com/images/stories/economic/hhe129.jpg',
      khayyam: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e6_wRZ-NPZKmzBm2jbWPG7bIxX8i5IDe7rkHaeolvvBXFhwqoMDm562-id0scyHX-CA&usqp=CAU',
      molana: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzBsIzbwPP51tC13VdemY5enR4jR6h2pjZw&s'
    }[room];
  }
}
