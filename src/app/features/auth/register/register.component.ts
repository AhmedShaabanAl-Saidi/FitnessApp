import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormField,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  auth = signal({ firstName: '', lastName: '', email: '', password: '' });

  registerForm = form(this.auth, (path) => ({
    firstName: required(path.firstName),
    lastName: required(path.lastName),
    email: [required(path.email), email(path.email)],
    password: [required(path.password), minLength(path.password, 6)]
  }));

  constructor(private router: Router) {}

  isFieldInvalid(fieldControl: any): boolean {
    return fieldControl().invalid() && (fieldControl().dirty() || fieldControl().touched());
  }

  onSubmit() {
    if (this.registerForm().valid()) {
      console.log('Register Form Submitted:', this.registerForm().value());
      // Logic for authentication goes here
    } else {
      this.registerForm().markAsTouched();
    }
  }
}
