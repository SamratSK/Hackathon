import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../interfaces/exam';
import { AppService } from './app.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly EXAMS_RETRIEVE = `${this.constants.BACKEND_URL}/exams/org/$id`;
  private readonly EXAMS_RETRIEVE_SINGLE = `${this.constants.BACKEND_URL}/exams/$id`;
  private readonly EXAMS_CREATE = `${this.constants.BACKEND_URL}/exams/create`;
  private readonly EXAMS_DELETE = `${this.constants.BACKEND_URL}/exams/delete/$id`;

  constructor(
    private constants: ConstantsService,
    private app: AppService,
    private http: HttpClient
  ) {}

  public createExam(exam: Exam) {
    let copied: any = { ...exam };
    copied['org_id'] = copied.organization.id;
    copied['teacher_id'] = copied.teacher.id;

    if (this.app.isAuthenticated())
      return this.http.post<{ message: string; exam: Exam }>(
        this.EXAMS_CREATE,
        copied,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.app.token}`,
          }),
        }
      );
    return null;
  }

  public retrieveExams(id: number) {
    if (this.app.isAuthenticated())
      return this.http.get<Exam[]>(
        this.EXAMS_RETRIEVE.replace('$id', id.toString()),
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.app.token}`,
          }),
        }
      );
    return null;
  }

  public retrieveExam(id: number) {
    if (this.app.isAuthenticated())
      return this.http.get<Exam>(
        this.EXAMS_RETRIEVE_SINGLE.replace('$id', id.toString()),
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.app.token}`,
          }),
        }
      );
    return null;
  }
}
