import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Exam } from 'src/app/interfaces/exam';
import { User } from 'src/app/interfaces/user';
import { UserType } from 'src/app/interfaces/UserType';
import { AppService } from 'src/app/services/app.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CreateExamComponent } from '../create-exam/create-exam.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //#region Variables
  exams: Exam[] = [];
  search: FormGroup;
  user: User;
  popupOpened = false;

  teacherType = UserType.Teacher;
  studentType = UserType.Student;
  //#endregion

  //#region Constructor
  constructor(
    app: AppService,
    private dashboard: DashboardService,
    public dialog: MatDialog
  ) {
    this.user = app.user!;
    this.search = new FormGroup({
      text: new FormControl(''),
    });
  }
  //#endregion

  //#region Functions
  ngOnInit(): void {
    if (!this.user.organization?.id && this.user.role !== UserType.Admin)
      return;

    if (this.user.organization?.id)
      this.dashboard.retrieveExams(this.user.organization?.id)?.subscribe({
        next: (data) => {
          this.exams = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onSearch() {
    console.log(this.search.value['text']);
  }

  startMessage(exam: Exam) {
    if (!exam.started) return 'Yet to start';
    if (!exam.completed) return 'Completed';
    return 'Unknown';
  }

  addExam() {
    const dialogRef = this.dialog.open(CreateExamComponent, {
      data: { exam: null },
      panelClass: 'exam-dialog',
    });
  }
  //#endregion
}
