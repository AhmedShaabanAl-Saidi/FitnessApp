import { computed, effect, signal, untracked } from '@angular/core';
import type { ElementRef, Signal, WritableSignal } from '@angular/core';
import { DEFAULT_OTP_LENGTH, MAX_OTP_LENGTH } from './input.interfaces';

interface OtpControllerConfig {
  length: Signal<number>;
  active: Signal<boolean>;
  disabled: Signal<boolean>;
  readOnly: Signal<boolean>;
  value: WritableSignal<string>;
  inputs: () => readonly ElementRef<HTMLInputElement>[];
  change: (value: string) => void;
  touched: () => void;
}

export class OtpInputController {
  readonly digits = signal<string[]>([]);
  readonly length = computed(() => {
    const length = this.config.length();

    return Number.isInteger(length) && length > 0
      ? Math.min(length, MAX_OTP_LENGTH)
      : DEFAULT_OTP_LENGTH;
  });
  readonly indexes = computed(() => Array.from({ length: this.length() }, (_, index) => index));

  constructor(private readonly config: OtpControllerConfig) {
    effect(() => {
      const length = this.length();
      const active = this.config.active();

      untracked(() => {
        const current = this.digits();
        const valueDigits = this.onlyDigits(this.config.value());
        const restoreValue = active && current.every((digit) => !digit) && valueDigits.length > 0;
        const next = this.fit(restoreValue ? [...valueDigits] : current, length);

        this.digits.set(next);

        if (active) {
          this.config.value.set(next.join(''));
        }
      });
    });
  }

  writeValue(value: string): void {
    const digits = this.onlyDigits(value).slice(0, this.length());
    const next = this.fit([...digits], this.length());

    this.digits.set(next);
    this.config.value.set(next.join(''));
  }

  digit(index: number): string {
    return this.digits()[index] ?? '';
  }

  select(event: FocusEvent): void {
    (event.target as HTMLInputElement).select();
  }

  input(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const entered = this.onlyDigits(input.value);

    if (!entered) {
      input.value = '';
      this.update(index, '');
      return;
    }

    const next = this.currentDigits();
    const available = entered.slice(0, this.length() - index);

    available.split('').forEach((digit, offset) => (next[index + offset] = digit));
    this.commit(next);

    const nextIndex = Math.min(index + available.length, this.length() - 1);
    if (nextIndex > index) {
      this.focus(nextIndex);
    }
  }

  keydown(index: number, event: KeyboardEvent): void {
    if (this.config.disabled() || this.config.readOnly()) {
      return;
    }

    const navigation: Record<string, number> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: this.length() - 1,
    };

    if (event.key === 'Backspace') {
      event.preventDefault();
      const clearCurrent = Boolean(this.digit(index)) || index === 0;
      const target = clearCurrent ? index : index - 1;
      this.update(target, '');
      this.focus(target);
      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();
      this.update(index, '');
      return;
    }

    const target = navigation[event.key];
    if (target !== undefined && target >= 0 && target < this.length()) {
      event.preventDefault();
      this.focus(target);
      return;
    }

    if (event.key.length === 1 && !/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  paste(event: ClipboardEvent): void {
    const pasted = this.onlyDigits(event.clipboardData?.getData('text') ?? '');
    if (!pasted) {
      return;
    }

    event.preventDefault();

    const parsedIndex = Number((event.target as HTMLElement).dataset['otpIndex']);
    const startIndex = Number.isInteger(parsedIndex) ? parsedIndex : 0;
    const available = pasted.slice(0, this.length() - startIndex);
    const next = this.currentDigits();

    available.split('').forEach((digit, offset) => (next[startIndex + offset] = digit));
    this.commit(next);
    this.focus(Math.min(startIndex + available.length, this.length() - 1));
  }

  focusOut(event: FocusEvent): void {
    const group = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;

    if (!nextTarget || !group.contains(nextTarget)) {
      this.config.touched();
    }
  }

  private currentDigits(): string[] {
    return this.fit(this.digits(), this.length());
  }

  private fit(digits: readonly string[], length: number): string[] {
    return Array.from({ length }, (_, index) => digits[index] ?? '');
  }

  private update(index: number, digit: string): void {
    const next = this.currentDigits();
    next[index] = digit;
    this.commit(next);
  }

  private commit(digits: string[]): void {
    const value = digits.join('');

    this.digits.set(digits);
    this.config.value.set(value);
    this.config.change(value);
  }

  private focus(index: number): void {
    const input = this.config.inputs()[index]?.nativeElement;

    input?.focus();
    input?.select();
  }

  private onlyDigits(value: string): string {
    return value.replace(/\D/g, '');
  }
}
