import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  auth = signal({ email: '' });

  forgotForm = form(this.auth, (path) => ({
    email: [required(path.email), email(path.email)]
  }));

  constructor(private router: Router) {}

  isFieldInvalid(fieldControl: any): boolean {
    return fieldControl().invalid() && (fieldControl().dirty() || fieldControl().touched());
  }

  onSubmit() {
    if (this.forgotForm().valid()) {
      console.log('Forgot Password Submitted:', this.forgotForm().value());
      this.router.navigate(['/auth/otp']);
    } else {
      this.forgotForm().markAsTouched();
    }
  }
}
