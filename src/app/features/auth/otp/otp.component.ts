import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { AuthPage, AuthPageData } from '../../../core/layout/auth-layout/interfaces/auth-page-data';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements AfterViewInit, AuthPage {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  
  digit1 = signal('');
  digit2 = signal('');
  digit3 = signal('');
  digit4 = signal('');

  isFormValid = computed(() => {
    const regex = /^[0-9]$/;
    return regex.test(this.digit1()) &&
           regex.test(this.digit2()) &&
           regex.test(this.digit3()) &&
           regex.test(this.digit4());
  });

  authData = signal<AuthPageData>({
    title: 'OTP CODE',
    description: 'Enter Your OTP Check Your Email'
  });

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

  onInput(event: Event, index: number, signalRef: any) {
    const inputElement = event.target as HTMLInputElement;
    let val = inputElement.value;
    
    // Only allow numeric
    val = val.replace(/[^0-9]/g, '');
    inputElement.value = val;
    signalRef.set(val);

    const inputElements = this.inputs.toArray();
    if (val.length === 1 && index < 3) {
      inputElements[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;
    const inputElements = this.inputs.toArray();
    const signalRefs = [this.digit1, this.digit2, this.digit3, this.digit4];

    if (key === 'Backspace') {
      const currentControl = signalRefs[index];
      if (!currentControl() && index > 0) {
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
    if (this.isFormValid()) {
      const otpValue = this.digit1() + this.digit2() + this.digit3() + this.digit4();
      console.log('OTP Form Submitted:', otpValue);
      this.router.navigate(['/auth/reset-password']);
    }
  }
}
