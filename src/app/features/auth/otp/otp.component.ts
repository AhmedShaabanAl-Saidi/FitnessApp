import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { form, FormField, required, pattern } from '@angular/forms/signals';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormField, AppButtonComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements AfterViewInit {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  
  otpData = signal({ digit1: '', digit2: '', digit3: '', digit4: '' });
  
  otpForm = form(this.otpData, (path) => ({
    digit1: [required(path.digit1), pattern(path.digit1, /^[0-9]$/)],
    digit2: [required(path.digit2), pattern(path.digit2, /^[0-9]$/)],
    digit3: [required(path.digit3), pattern(path.digit3, /^[0-9]$/)],
    digit4: [required(path.digit4), pattern(path.digit4, /^[0-9]$/)]
  }));

  resendTimer = 30;
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(private router: Router) {
    this.startResendTimer();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputs.first.nativeElement.focus();
    }, 100);
  }

  startResendTimer() {
    this.resendTimer = 30;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const val = event.key;
    const inputElements = this.inputs.toArray();

    if (val >= '0' && val <= '9') {
      if (index < 3) {
        inputElements[index + 1].nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;
    const inputElements = this.inputs.toArray();

    if (key === 'Backspace') {
      const controlKey = `digit${index + 1}` as keyof typeof this.otpForm;
      const currentControl = (this.otpForm as any)[controlKey];
      if (!currentControl().value() && index > 0) {
        inputElements[index - 1].nativeElement.focus();
      }
    }
  }

  resendCode() {
    this.startResendTimer();
    console.log('Resending code...');
    alert('A new OTP has been sent to your email.');
  }

  onSubmit() {
    if (this.otpForm().valid()) {
      const otpValue = this.otpForm.digit1().value() + this.otpForm.digit2().value() + this.otpForm.digit3().value() + this.otpForm.digit4().value();
      console.log('OTP Form Submitted:', otpValue);
      this.router.navigate(['/auth/reset-password']);
    } else {
      this.otpForm().markAsTouched();
    }
  }
}
