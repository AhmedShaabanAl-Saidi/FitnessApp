import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { AuthSocialLogin } from '../components/auth-social-login/auth-social-login';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Button, Input, AuthSocialLogin],
  templateUrl: './register.html',
})
export class Register {
  private readonly router = inject(Router);

  protected readonly form = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected nameError(control: AbstractControl, label: string): string {
    return control.hasError('required')
      ? `${label} is required.`
      : `${label} must contain at least 2 characters.`;
  }

  protected emailError(): string {
    return this.form.controls.email.hasError('required')
      ? 'Email is required.'
      : 'Enter a valid email address.';
  }

  protected passwordError(): string {
    return this.form.controls.password.hasError('required')
      ? 'Password is required.'
      : 'Password must contain at least 8 characters.';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/onboarding');
  }
}
