import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(
  passwordControlName = 'password',
  confirmationControlName = 'confirmation',
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName);
    const confirmationControl = control.get(confirmationControlName);

    if (!passwordControl || !confirmationControl) return null;

    return passwordControl.value === confirmationControl.value ? null : { passwordMismatch: true };
  };
}

export function getConfirmPasswordError(control: AbstractControl): string {
  if (control.hasError('required')) {
    return 'AUTH.VALIDATION.CONFIRM_PASSWORD_REQUIRED';
  }
  return 'AUTH.VALIDATION.PASSWORD_MISMATCH';
}
