import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppButtonComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements AfterViewInit {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  otpForm: FormGroup;
  resendTimer = 30;
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
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
      const currentControl = this.otpForm.get(`digit${index + 1}`);
      if (!currentControl?.value && index > 0) {
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
    if (this.otpForm.valid) {
      const otpValue = Object.values(this.otpForm.value).join('');
      console.log('OTP Form Submitted:', otpValue);
      this.router.navigate(['/auth/reset-password']);
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
