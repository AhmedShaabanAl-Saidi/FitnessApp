import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;

  return password === confirmation ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, Button, Input],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly router = inject(Router);

  protected readonly form = new FormGroup(
    {
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmation: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    },
    { validators: passwordsMatch },
  );

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected passwordError(): string {
    return this.form.controls.password.hasError('required')
      ? 'Password is required.'
      : 'Password must contain at least 8 characters.';
  }

  protected confirmationInvalid(): boolean {
    const control = this.form.controls.confirmation;

    return (
      (control.touched || control.dirty) &&
      (control.hasError('required') || this.form.hasError('passwordMismatch'))
    );
  }

  protected confirmationError(): string {
    return this.form.controls.confirmation.hasError('required')
      ? 'Please confirm your password.'
      : 'Passwords do not match.';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/login');
  }
}
