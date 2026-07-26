import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../../shared/components/button/button';
import { Input as InputComponent } from '../../../../shared/components/input/input';
import { getConfirmPasswordError, passwordsMatchValidator } from '../../../../shared/utils/form-validators';
import { AuthService } from '../../../auth/services/auth.service';
import { TokenService } from '../../../auth/services/token.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password-modal',
  imports: [ReactiveFormsModule, TranslatePipe, Button, InputComponent, RouterLink],
  templateUrl: './change-password-modal.html',
})
export class ChangePasswordModal {
  @Output() closeModal = new EventEmitter<void>();

  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup(
    {
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmation: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    },
    { validators: passwordsMatchValidator('newPassword', 'confirmation') },
  );

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected currentPasswordError(): string {
    return 'AUTH.VALIDATION.PASSWORD_REQUIRED';
  }

  protected newPasswordError(): string {
    return this.form.controls.newPassword.hasError('required')
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

  submitChangePassword(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password, newPassword } = this.form.getRawValue();

    this.authService
      .changePassword({ password, newPassword })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.token) {
            this.tokenService.setToken(res.token);
          }
          this.closeModal.emit();
        },
      });
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
