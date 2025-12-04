import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { StudentDashboardService } from './student-dashboard.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule
  ],
  templateUrl: 'studentDashbord.component.html',
})
export class StudentDashboardComponent implements OnInit {
   weekDays: string[] = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه","پنجشنبه"];
   classHours: string[] = [];   // از بک‌اند گرفته می‌شود
   weeklySchedule: any = {};    // برنامه هفتگی استاد
constructor(private dashboardService: StudentDashboardService) {}


ngOnInit(): void {
  this.classHours = this.dashboardService.getClassHours();
  this.weeklySchedule = this.dashboardService.getWeeklyScheduleForTeacher();
}

  showAllExamsDialog = false;
  messages = [
    "تغییر محل امتحان درس ریاضی",
    "تغییر ساعت امتحان برنامه‌سازی",
    "کارت ورود به جلسه آماده شد","معلم رسید","خاک بر سرم","اوا مامانم ایناs"
  ];
   todayOverview = [
    "تعداد امتحانات امروز: 1",
    "کلاس‌های امروز: 2",
    "اعلان‌های جدید: 3"
  ];


  exams = [
    { exam: "میان‌ترم ۱", course: "برنامه‌سازی", date: "1403/10/10", time: "10:30", room: "A", status: "ثبت شده" },
    { exam: "میان‌ترم ۲", course: "ریاضی ۱", date: "1403/10/12", time: "13:00", room: "C", status: "لغو شده" },
    { exam: "کوییز", course: "فیزیک ۲", date: "1403/10/15", time: "9:00", room: "B", status: "ثبت شده" },
    { exam: "پایان‌ترم", course: "برنامه‌سازی", date: "1403/11/01", time: "11:00", room: "A", status: "ثبت شده" },
    { exam: "آزمون کوتاه", course: "ریاضی ۲", date: "1403/11/10", time: "12:00", room: "D", status: "ثبت شده" }
  ];

  get lastThreeExams() {
    return this.exams.slice(0, 3);
  }

  openAllExams() {
    this.showAllExamsDialog = true;
  }
}