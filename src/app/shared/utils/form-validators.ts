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
