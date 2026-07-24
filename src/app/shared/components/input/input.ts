import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputOtp } from 'primeng/inputotp';
import {
  DEFAULT_OTP_LENGTH,
  FIELD_CLASSES,
  NATIVE_INPUT_CLASSES,
  OTP_INPUT_CLASSES,
  PASSWORD_TOGGLE_CLASSES,
  normalizeOtpLength,
} from './input.interfaces';
import type { InputType, TextInputMode } from './input.interfaces';
export type { InputType, TextInputMode } from './input.interfaces';

@Component({
  selector: 'app-input',
  imports: [FormsModule, InputOtp, TranslatePipe],
  templateUrl: './input.html',
  styleUrl: './input.css',
  host: { '[attr.id]': 'null' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  readonly id = input.required<string>();
  readonly type = input<InputType>('text');
  readonly label = input('');
  readonly placeholder = input('');
  readonly autocomplete = input<string>();
  readonly inputMode = input<TextInputMode>('text');
  readonly leadingIcon = input('');
  readonly readOnly = input(false, { alias: 'readonly' });
  readonly required = input(false);
  readonly hint = input('');
  readonly invalid = input(false);
  readonly errorMessage = input('');
  readonly otpLength = input(DEFAULT_OTP_LENGTH, { transform: normalizeOtpLength });

  protected readonly value = signal('');
  protected readonly disabled = signal(false);
  protected readonly passwordVisible = signal(false);
  protected readonly nativeInputClasses = NATIVE_INPUT_CLASSES;
  protected readonly passwordToggleClasses = PASSWORD_TOGGLE_CLASSES;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly view = computed(() => {
    const id = this.id();
    const isOtp = this.type() === 'otp';
    const isPassword = this.type() === 'password';
    const showError = this.invalid() && Boolean(this.errorMessage());
    const supportingText = showError ? this.errorMessage() : this.hint();

    return {
      isOtp,
      nativeType: isPassword && this.passwordVisible() ? 'text' : this.type(),
      labelId: `${id}-label`,
      labelFor: isOtp ? null : id,
      inputAriaLabel: this.label() ? null : this.placeholder() || id,
      otpGroupAriaLabel: this.label() ? null : this.placeholder() || 'AUTH.COMMON.OTP_GROUP',
      displayPasswordToggle: isPassword,
      passwordToggleLabel: this.passwordVisible()
        ? 'AUTH.COMMON.HIDE_PASSWORD'
        : 'AUTH.COMMON.SHOW_PASSWORD',
      passwordIconClasses: this.passwordVisible() ? 'pi pi-eye-slash' : 'pi pi-eye',
      leadingIconClasses: `${this.leadingIcon()} text-sm opacity-70`,
      fieldClasses: `${FIELD_CLASSES} ${this.borderClass()}${this.disabled() ? ' opacity-60' : ''}`,
      otpInputClasses: `${OTP_INPUT_CLASSES} ${this.borderClass()}`,
      otpLength: this.otpLength(),
      supportingText,
      supportingTextId: supportingText ? `${id}-${showError ? 'error' : 'hint'}` : null,
      supportingTextClasses: showError
        ? 'mt-1.5 text-xs text-red-400'
        : 'mt-1.5 text-xs opacity-65',
      supportingTextRole: showError ? 'alert' : null,
    };
  });

  writeValue(value: unknown): void {
    this.value.set(value == null ? '' : String(value));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected handleInput(event: Event): void {
    this.updateValue((event.target as HTMLInputElement).value);
  }

  protected handleOtpChange(value: unknown): void {
    this.updateValue(Array.isArray(value) ? value.join('') : String(value ?? ''));
  }

  protected handleOtpFocusOut(event: FocusEvent): void {
    const group = event.currentTarget as HTMLElement;

    if (!group.contains(event.relatedTarget as Node | null)) {
      this.onTouched();
    }
  }

  protected markAsTouched(): void {
    this.onTouched();
  }

  protected togglePasswordVisibility(): void {
    if (!this.disabled()) {
      this.passwordVisible.update((visible) => !visible);
    }
  }

  private borderClass(): string {
    return this.invalid() ? 'border-red-500' : 'border-neutral-400';
  }

  private updateValue(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }
}
