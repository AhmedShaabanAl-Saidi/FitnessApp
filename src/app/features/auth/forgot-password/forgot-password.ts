import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, TranslatePipe, Button, Input],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  @Output() success = new EventEmitter<string>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected emailError(): string {
    return this.form.controls.email.hasError('required')
      ? 'AUTH.VALIDATION.EMAIL_REQUIRED'
      : 'AUTH.VALIDATION.EMAIL_INVALID';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.controls.email.value;

    this.authService
      .forgotPassword(email)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.success.observed) {
            this.success.emit(email);
          } else {
            void this.router.navigate(['/auth/otp'], { state: { email } });
          }
        },
      });
  }
}
