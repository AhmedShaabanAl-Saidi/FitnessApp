import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from '../../../shared/components/input/input.component';
import { AppErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule,
    AppInputComponent,
    AppErrorMessageComponent,
    AppButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register Form Submitted:', this.registerForm.value);
      alert('Mock Sign Up Successful!');
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
