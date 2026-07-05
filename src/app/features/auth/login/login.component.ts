import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/ui/reusable-input/text/text-input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { AuthPage, AuthPageData } from '../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    TextInputComponent,
    AppButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AuthPage {
  email = signal('');
  password = signal('');
  
  emailTouched = signal(false);
  passwordTouched = signal(false);

  emailError = computed(() => {
    const val = this.email();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return { key: 'VALIDATION.EMAIL' };
    return null;
  });

  passwordError = computed(() => {
    const val = this.password();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    if (val.length < 6) return { key: 'VALIDATION.MIN_LENGTH', params: { length: 6 } };
    return null;
  });

  isFormValid = computed(() => !this.emailError() && !this.passwordError());

  authData = signal<AuthPageData>({
    title: 'WELCOME BACK',
    description: 'Hey There',
    footerText: 'Dont Have An Account Yet?',
    footerLinkText: 'Register',
    footerLinkRoute: '/auth/register'
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    
    if (this.isFormValid()) {
      console.log('Login Form Submitted:', { email: this.email(), password: this.password() });
      // Logic for authentication goes here
    }
  }
}
