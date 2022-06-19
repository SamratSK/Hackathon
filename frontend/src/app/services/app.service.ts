import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public token: string = '';
  public user?: User;

  // public token: string = '3|aOSFbMGkwLpAijQaZ39CyLzpkBmVjd4T4VrWAq67';
  // public user?: User = {
  //   email: 'james1@gmail.com',
  //   id: 1,
  //   name: 'James',
  //   role: 1,
  //   organization: {
  //     id: 1,
  //     name: 'iNeuron.ai',
  //   },
  // };

  constructor(private router: Router) {}

  public isAuthenticated() {
    if (this.token) if (this.token.trim()) if (this.user) return true;
    return false;
  }

  public setAuthState(user: User, token: string) {
    this.user = user;
    this.token = token;

    this.router.navigate(['/main']);
  }
}
