import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/interfaces/exam';
import { Question } from 'src/app/interfaces/question';
import { DashboardService } from 'src/app/services/dashboard.service';

interface AnswerKey {
  questionId: number;
  subId: number;
  optionId: number;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  exam?: Exam;
  answerKeys: AnswerKey[] = [];
  questionIndex?: number;
  subjectIndex?: number;

  constructor(dashboard: DashboardService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id')!.toString();
    dashboard.retrieveExam(parseInt(id))?.subscribe({
      next: (data) => {
        this.exam = data;
        this.openQuestion(0, 0);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openQuestion(qIndex: number, subIndex: number) {
    this.questionIndex = qIndex;
    this.subjectIndex = subIndex;
  }

  setAnswerKey(qId: number, subId: number, optionId: number) {
    this.answerKeys.push({
      questionId: qId,
      subId,
      optionId,
    });
  }
}
