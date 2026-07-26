import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input as InputComponent } from '../../../shared/components/input/input';
import { getConfirmPasswordError, passwordsMatchValidator } from '../../../shared/utils/form-validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslatePipe, Button, InputComponent],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  @Input() email?: string;
  @Output() success = new EventEmitter<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

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
    return getConfirmPasswordError(this.form.controls.confirmation);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password } = this.form.getRawValue();
    const targetEmail = this.email || history.state?.email || '';

    this.authService
      .resetPassword(targetEmail, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.success.observed) {
            this.success.emit();
          } else {
            void this.router.navigateByUrl('/auth/login');
          }
        },
      });
  }
}
