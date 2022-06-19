import { Option } from './option';

export interface Question {
  id: number;
  content: string;
  image: string;
  options: Option[];
}
