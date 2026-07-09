import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/ui/reusable-input/text/text-input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { AuthPage, AuthPageData } from '../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    TextInputComponent,
    AppButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AuthPage {
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');

  firstNameTouched = signal(false);
  lastNameTouched = signal(false);
  emailTouched = signal(false);
  passwordTouched = signal(false);

  firstNameError = computed(() => {
    const val = this.firstName();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    return null;
  });

  lastNameError = computed(() => {
    const val = this.lastName();
    if (!val) return { key: 'VALIDATION.REQUIRED' };
    return null;
  });

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

  isFormValid = computed(() => 
    !this.firstNameError() && 
    !this.lastNameError() && 
    !this.emailError() && 
    !this.passwordError()
  );

  authData = signal<AuthPageData>({
    title: 'Create An Account',
    description: 'Hey There',
    footerText: 'Already Have An Account ?',
    footerLinkText: 'Login',
    footerLinkRoute: '/auth/login'
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.firstNameTouched.set(true);
    this.lastNameTouched.set(true);
    this.emailTouched.set(true);
    this.passwordTouched.set(true);

    if (this.isFormValid()) {
      console.log('Register Form Submitted:', {
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        password: this.password()
      });
      // Logic for authentication goes here
    }
  }
}
