import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register: FormGroup;
  registering = false;
  error?: string = undefined;

  constructor(private app: AppService, private auth: AuthService) {
    this.register = new FormGroup({
      name: new FormControl('New user', [Validators.required]),
      email: new FormControl('admin@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('admin', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
      ]),
      orgId: new FormControl('ABCD', [Validators.required]),
      role: new FormControl(1, [Validators.required]),
    });
  }

  registerSubmit() {
    if (!this.register.valid) return;

    this.registering = true;
    // this.auth
    //   .register(this.register.value['email'], this.register.value['password'])
    //   .subscribe({
    //     next: (data) => {
    //       this.app.setAuthState(data.user, data.token);
    //       this.registering = false;
    //     },
    //     error: (error) => {
    //       if (error.error.message) this.error = error.error.message;
    //       else this.error = 'Unknown error';
    //       this.registering = false;
    //     },
    //   });
  }
}
