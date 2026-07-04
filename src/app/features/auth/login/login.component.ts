import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormField,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = signal({ email: '', password: '' });

  loginForm = form(this.auth, (path) => ({
    email: [required(path.email), email(path.email)],
    password: [required(path.password), minLength(path.password, 6)]
  }));

  constructor(private router: Router) {}

  isFieldInvalid(fieldControl: any): boolean {
    return fieldControl().invalid() && (fieldControl().dirty() || fieldControl().touched());
  }

  onSubmit() {
    if (this.loginForm().valid()) {
      console.log('Login Form Submitted:', this.loginForm().value());
      // Logic for authentication goes here
    } else {
      this.loginForm().markAsTouched();
    }
  }
}
