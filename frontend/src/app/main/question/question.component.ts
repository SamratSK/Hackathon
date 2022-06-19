import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Option } from 'src/app/interfaces/option';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: Question = { id: -1, content: '', image: '', options: [] };
  @Input() index: number = -1;

  addOption() {
    if (this.question.options.length < 4)
      this.question.options.push({
        id: -1,
        content: '',
        correct: false,
      });
  }

  removeOption(index: number) {
    this.question.options.splice(index, 1);
  }

  checkOption(index: number) {
    console.log(index);
    this.question.options.forEach((question) => (question.correct = false));
    this.question.options[index].correct = true;
  }
}
