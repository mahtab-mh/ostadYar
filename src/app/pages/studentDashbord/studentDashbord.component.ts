import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: 'studentDashbord.component.html',
})
export class StudentDashboardComponent {

  todayOverview = [
    "تعداد امتحانات امروز: 1",
    "کلاس‌های امروز: 2",
    "اعلان‌های جدید: 3"
  ];

  exams = [
    { exam: 'میان‌ترم 1', course: 'ریاضی 1', date: '1403/10/10', time: '10:30', room: 'اتاق A', status: 'ثبت‌نام شده' },
    { exam: 'پایان‌ترم', course: 'برنامه‌سازی', date: '1403/10/18', time: '09:00', room: 'اتاق C', status: 'تغییر یافته' }
  ];

  courses = ['برنامه‌نویسی 1', 'ریاضی 1', 'فیزیک 2'];

  messages = [
    "تغییر محل امتحان درس ریاضی",
    "تغییر ساعت امتحان برنامه‌سازی",
    "کارت ورود به جلسه آماده شد"
  ];
}
