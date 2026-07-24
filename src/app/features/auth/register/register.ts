import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { AuthSocialLogin } from '../components/auth-social-login/auth-social-login';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, Button, Input, AuthSocialLogin],
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

  protected firstNameError(): string {
    return this.form.controls.firstName.hasError('required')
      ? 'AUTH.VALIDATION.FIRST_NAME_REQUIRED'
      : 'AUTH.VALIDATION.FIRST_NAME_MIN';
  }

  protected lastNameError(): string {
    return this.form.controls.lastName.hasError('required')
      ? 'AUTH.VALIDATION.LAST_NAME_REQUIRED'
      : 'AUTH.VALIDATION.LAST_NAME_MIN';
  }

  protected emailError(): string {
    return this.form.controls.email.hasError('required')
      ? 'AUTH.VALIDATION.EMAIL_REQUIRED'
      : 'AUTH.VALIDATION.EMAIL_INVALID';
  }

  protected passwordError(): string {
    return this.form.controls.password.hasError('required')
      ? 'AUTH.VALIDATION.PASSWORD_REQUIRED'
      : 'AUTH.VALIDATION.PASSWORD_MIN';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/onboarding');
  }
}
