import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted:', this.loginForm.value);
      alert('Mock Sign In Successful!');
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
