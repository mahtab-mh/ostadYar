import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/api/courses'; // آدرس بک‌اند جاوا

  constructor(private http: HttpClient) {}

  getCoursesByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/teacher/${teacherId}`);
  }
}
