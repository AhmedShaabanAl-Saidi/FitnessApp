import { Component, DestroyRef, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input as InputComponent } from '../../../shared/components/input/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, TranslatePipe, Button, InputComponent],
  templateUrl: './otp.html',
})
export class Otp {
  @Input() email?: string;
  @Output() success = new EventEmitter<string>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly resendMessage = signal<string>('');

  protected readonly form = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{4}$/)],
    }),
  });

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected codeError(): string {
    return this.form.controls.code.hasError('required')
      ? 'AUTH.VALIDATION.CODE_REQUIRED'
      : 'AUTH.VALIDATION.CODE_INCOMPLETE';
  }

  protected resend(): void {
    const targetEmail = this.email || history.state?.email;
    this.form.controls.code.reset();
    this.resendMessage.set('');

    if (targetEmail) {
      this.authService
        .forgotPassword(targetEmail)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.resendMessage.set('AUTH.OTP.RESENT');
          },
        });
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const code = this.form.controls.code.value;

    this.authService
      .verifyResetCode(code)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.success.observed) {
            this.success.emit(code);
          } else {
            const targetEmail = this.email || history.state?.email;
            void this.router.navigate(['/auth/reset-password'], { state: { email: targetEmail } });
          }
        },
      });
  }
}
