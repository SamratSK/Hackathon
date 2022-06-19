import { Question } from './question';

export interface Subject {
  id: number;
  name: string;
  questions: Question[];
}
