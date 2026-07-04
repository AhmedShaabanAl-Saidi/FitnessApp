import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { form, FormField, required, minLength } from '@angular/forms/signals';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  auth = signal({ password: '', confirmPassword: '' });

  resetForm = form(this.auth, (path) => ({
    password: [required(path.password), minLength(path.password, 6)],
    confirmPassword: [required(path.confirmPassword)]
  }));

  // Computed signal to track if passwords match
  passwordsMatch = computed(() => {
    return this.auth().password === this.auth().confirmPassword;
  });

  constructor(private router: Router) {}

  isFieldInvalid(fieldControl: any): boolean {
    return fieldControl().invalid() && (fieldControl().dirty() || fieldControl().touched());
  }

  isConfirmPasswordInvalid(): boolean {
    const confirmControl = this.resetForm.confirmPassword;
    return (confirmControl().invalid() || !this.passwordsMatch()) && (confirmControl().dirty() || confirmControl().touched());
  }

  onSubmit() {
    if (this.resetForm().valid() && this.passwordsMatch()) {
      console.log('Reset Password Submitted:', this.resetForm().value());
      this.router.navigate(['/auth/login']);
    } else {
      this.resetForm().markAsTouched();
    }
  }
}
