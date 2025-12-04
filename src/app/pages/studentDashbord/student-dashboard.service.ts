import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentDashboardService {

  // JSON خام اصلی که از بک‌اند می‌گیری (فعلاً ثابت)
  private rawData: any = {
    student: {
      firstName: "سارا",
      lastName: "محمدی",
      studentNumber: 981111222,
      username: "sara_mh"
    },

    courses: [
      {
        id: 1,
        name: "متریال ها",
        code: "MAT101",
        teacher: "علی رضایی",
        students: [
          { name: "علی رضایی", id: "981234567" },
          { name: "مهسا سلیمی", id: "991112233" }
        ],
        exams: [
          { id: 1, name: "میان‌ترم", startDate: "1403/10/12", endDate: "1403/10/12", room: "A" },
          { id: 2, name: "پایان‌ترم", startDate: "1403/11/30", endDate: "1403/11/30", room: "A" }
        ]
      },

      {
        id: 2,
        name: "ساختمان داده",
        code: "DS204",
        teacher: "احمد اکبری",
        students: [
          { name: "سارا محمدی", id: "981111222" },
          { name: "احمد اکبری", id: "991232323" }
        ],
        exams: [
          { id: 3, name: "میان‌ترم", startDate: "1403/09/28", endDate: "1403/09/28", room: "B" },
          { id: 4, name: "پایان‌ترم", startDate: "1403/11/18", endDate: "1403/11/18", room: "C" }
        ]
      }
    ]
  };

  // ===============================  
  // 1) گرفتن اطلاعات دانشجو  
  // ===============================
  getStudent() {
    return this.rawData.student;
  }

  // ===============================  
  // 2) گرفتن لیست درس‌ها  
  // ===============================
  getCourses() {
    return this.rawData.courses.map((course: any) => ({
      id: course.id,
      name: course.name,
      code: course.code,
      teacher: course.teacher,
      enrolledCount: course.students.length
    }));
  }

  // ===============================  
  // 3) استخراج همه امتحانات  
  // ===============================
  getExams() {
    const exams: any[] = [];

    this.rawData.courses.forEach((course: any) => {
      course.exams.forEach((exam: any) => {
        exams.push({
          id: exam.id,
          examName: exam.name,
          startDate: exam.startDate,
          endDate: exam.endDate,
          room: exam.room,
          courseName: course.name
        });
      });
    });

    return exams;
  }

  // ===============================  
  // 4) سه امتحان آخر  
  // ===============================
  getLastThreeExams() {
    return this.getExams().slice(0, 3);
  }

  // ===============================  
  // 5) آمار داشبورد  
  // ===============================
  getDashboardStats() {
    const exams = this.getExams();

    return {
      totalCourses: this.rawData.courses.length,
      totalExams: exams.length,
      teachersCount: new Set(this.rawData.courses.map((c: any) => c.teacher)).size,
      nextExam: exams[0]?.startDate ?? "نامشخص"
    };
  }
  getClassHours() {
  // این دیتای تست است → بعداً از API برمی‌گردد
  return [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "13:00 - 15:00",
    "15:00 - 17:00"
  ];
}

getWeeklyScheduleForTeacher() {
  return {
    "پنجشنبه": {
      "08:00 - 10:00": { course: "ساختمان داده", room: "کلاس 203" },
      "13:00 - 15:00": { course: "طراحی الگوریتم", room: "کلاس 110" }
    },
    "دوشنبه": {
      "10:00 - 12:00": { course: "برنامه‌سازی پیشرفته", room: "لابراتوار 2" }
    },
    "چهارشنبه": {
      "15:00 - 17:00": { course: "سیستم عامل", room: "کلاس 305" }
    },
    "سه‌شنبه": {
        "10:00 - 12:00":{course:"شاخص های ریدن", room: "دستشویی طبقه ۲"}

    }
  };
}
}
