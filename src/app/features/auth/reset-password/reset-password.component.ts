import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/ui/reusable-input/text/text-input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { AuthPage, AuthPageData } from '../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    AppButtonComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements AuthPage {
  password = signal('');
  confirmPassword = signal('');
  
  passwordTouched = signal(false);
  confirmPasswordTouched = signal(false);

  passwordError = computed(() => {
    const val = this.password();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    if (val.length < 6) return { key: 'VALIDATION.MIN_LENGTH', params: { length: 6 } };
    return null;
  });

  confirmPasswordError = computed(() => {
    const val = this.confirmPassword();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    if (val !== this.password()) return { key: 'VALIDATION.MISMATCH' };
    return null;
  });

  isFormValid = computed(() => !this.passwordError() && !this.confirmPasswordError());

  authData = signal<AuthPageData>({
    title: 'Create New Password',
    description: 'Make Sure Its 8 Characters Or More'
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.passwordTouched.set(true);
    this.confirmPasswordTouched.set(true);

    if (this.isFormValid()) {
      console.log('Reset Password Submitted:', { password: this.password() });
      this.router.navigate(['/auth/login']);
    }
  }
}
