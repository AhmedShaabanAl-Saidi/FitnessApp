import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { passwordsMatchValidator } from '../../../shared/utils/form-validators';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslatePipe, Button, Input],
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
    { validators: passwordsMatchValidator() },
  );

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected passwordError(): string {
    return this.form.controls.password.hasError('required')
      ? 'AUTH.VALIDATION.PASSWORD_REQUIRED'
      : 'AUTH.VALIDATION.PASSWORD_MIN';
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
      ? 'AUTH.VALIDATION.CONFIRM_PASSWORD_REQUIRED'
      : 'AUTH.VALIDATION.PASSWORD_MISMATCH';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/login');
  }
}
