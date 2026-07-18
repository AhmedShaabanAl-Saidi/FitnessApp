import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, Button, Input],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private readonly router = inject(Router);

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
      ? 'Email is required.'
      : 'Enter a valid email address.';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.router.navigateByUrl('/auth/otp');
  }
}
