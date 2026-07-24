import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, TranslatePipe, Button, Input],
  templateUrl: './otp.html',
})
export class Otp {
  private readonly router = inject(Router);

  protected readonly form = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{4}$/)],
    }),
  });
  protected readonly resendMessage = signal('');

  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  protected codeError(): string {
    return this.form.controls.code.hasError('required')
      ? 'AUTH.VALIDATION.CODE_REQUIRED'
      : 'AUTH.VALIDATION.CODE_INCOMPLETE';
  }

  protected resend(): void {
    this.form.controls.code.reset();
    this.resendMessage.set('AUTH.OTP.RESENT');
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/reset-password');
  }
}
