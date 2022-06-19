import { Organization } from './organization';
import { Subject } from './subject';
import { User } from './user';

export interface Exam {
  id: number;
  name: string;
  organization: Organization;
  teacher: User;
  subjects: Subject[];
  started: boolean;
  completed: boolean;
  description?: string;
}
