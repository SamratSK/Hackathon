import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AppService } from './app.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_URL = `${this.constants.BACKEND_URL}/auth/login`;
  private readonly REGISTER_URL = `${this.constants.BACKEND_URL}/auth/register`;
  private readonly LOGOUT_URL = `${this.constants.BACKEND_URL}/auth/logut`;

  constructor(
    private constants: ConstantsService,
    private app: AppService,
    private http: HttpClient
  ) {}

  public login(email: String, password: String) {
    return this.http.post<{ user: User; token: string }>(this.LOGIN_URL, {
      email,
      password,
    });
  }

  public logout() {
    if (this.app.isAuthenticated())
      return this.http.post<{ message: string }>(
        this.LOGOUT_URL,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.app.token}`,
          }),
        }
      );
    return null;
  }

  public register(
    name: string,
    email: String,
    password: String,
    org_id: number,
    role: number
  ) {
    return this.http.post<{ message: string }>(this.REGISTER_URL, {
      email,
      password,
    });
  }
}
