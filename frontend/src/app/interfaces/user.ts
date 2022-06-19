import { Organization } from './organization';

export interface User {
  id: number;
  name: string;
  email: string;
  organization?: Organization;
  role: number;
}
