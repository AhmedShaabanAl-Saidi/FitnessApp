import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/ui/reusable-input/text/text-input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { AuthPage, AuthPageData } from '../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    AppButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements AuthPage {
  email = signal('');
  emailTouched = signal(false);

  emailError = computed(() => {
    const val = this.email();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return { key: 'VALIDATION.EMAIL' };
    return null;
  });

  isFormValid = computed(() => !this.emailError());

  authData = signal<AuthPageData>({
    title: 'Forget Password',
    description: 'Enter Your Email'
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.emailTouched.set(true);

    if (this.isFormValid()) {
      console.log('Forgot Password Submitted:', { email: this.email() });
      this.router.navigate(['/auth/otp']);
    }
  }
}
