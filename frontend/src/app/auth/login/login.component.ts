import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;
  loggingIn = false;
  error?: string = undefined;

  constructor(
    private app: AppService,
    private auth: AuthService,
    private router: Router
  ) {
    this.login = new FormGroup({
      email: new FormControl('admin@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('admin', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
      ]),
    });
  }

  loginSubmit() {
    if (!this.login.valid) return;

    this.loggingIn = true;
    this.auth
      .login(this.login.value['email'], this.login.value['password'])
      .subscribe({
        next: (data) => {
          this.app.setAuthState(data.user, data.token);
          this.loggingIn = false;
          this.router.navigate(['/main/']);
        },
        error: (error) => {
          if (error.error.message) this.error = error.error.message;
          else this.error = 'Unknown error';
          this.loggingIn = false;
        },
      });
  }
}
