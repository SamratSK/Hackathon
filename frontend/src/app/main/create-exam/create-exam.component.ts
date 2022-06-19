import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Exam } from 'src/app/interfaces/exam';
import { Organization } from 'src/app/interfaces/organization';
import { User } from 'src/app/interfaces/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData {
  edit: boolean;
  exam?: Exam;
}

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent implements OnInit {
  //#region Variables
  exam?: Exam;
  createExam: FormGroup;
  subjectName: string = '';
  selectedSubjectIndex: number = -1;
  loading = true;
  //#endregion

  //#region Constructor
  constructor(
    public dialogRef: MatDialogRef<CreateExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private dashboard: DashboardService,
    private appService: AppService
  ) {
    if (data.exam) this.exam = data.exam;

    this.createExam = new FormGroup({
      name: new FormControl(this.exam?.name ?? '', Validators.required),
      description: new FormControl(this.exam?.description ?? ''),
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  ngOnInit(): void {
    if (!this.exam)
      // Sample exam
      this.exam = {
        name: 'Exam Name',
        id: -1,
        organization: this.appService.user?.organization!,
        teacher: this.appService.user!,
        subjects: [],
        started: false,
        completed: false,
      };
  }
  //#endregion

  //#region Functions
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.exam || !this.createExam.valid) return;

    this.exam.name = this.createExam.value.name;
    this.exam.description = this.createExam.value.description;

    this.dashboard.createExam(this.exam)?.subscribe({
      next: (data) => {
        if (data.message && data.exam) {
          this.dialogRef.close(data);
          this.snackBar.open(data.message);
          return;
        }
        this.dialogRef.close;
      },
      error: (error) => {
        this.dialogRef.close();
        this.snackBar.open(error.message ?? 'An unknown error occured.');
      },
    });
  }

  addSubject() {
    if (!this.canAddSubject()) return;

    this.exam?.subjects.push({
      id: -1,
      name: this.subjectName,
      questions: [],
    });

    this.subjectName = '';
    this.selectedSubjectIndex = this.exam?.subjects.length! - 1;
  }

  addQuestion() {
    const sampleOption = {
      id: 0,
      content: '',
      correct: false,
    };

    this.exam?.subjects[this.selectedSubjectIndex].questions.push({
      id: -1,
      content: '',
      image: '',
      options: [{ ...sampleOption }, { ...sampleOption }],
    });
  }

  canAddSubject() {
    if (this.subjectName && this.subjectName.trim()) return true;
    return false;
  }
  //#endregion
}
