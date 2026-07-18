import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  effect,
  forwardRef,
  input,
  numberAttribute,
  signal,
  untracked,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { Swiper } from 'swiper/types';

import {
  DEFAULT_VISIBLE_ITEMS,
  createNumberRange,
  findClosestIndex,
  normalizeVisibleItems,
} from './number-picker.interfaces';
import type { NumberPickerFormatter } from './number-picker.interfaces';

export type { NumberPickerFormatter } from './number-picker.interfaces';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.html',
  styleUrl: './number-picker.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberPicker),
      multi: true,
    },
  ],
})
export class NumberPicker implements ControlValueAccessor {
  readonly id = input.required<string>();
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly unit = input('');
  readonly ariaLabel = input('Number picker');
  readonly visibleItems = input(DEFAULT_VISIBLE_ITEMS, { transform: numberAttribute });
  readonly readOnly = input(false, { alias: 'readonly' });
  readonly formatter = input<NumberPickerFormatter>((value) => String(value));

  protected readonly value = signal<number | null>(null);
  protected readonly disabled = signal(false);
  protected readonly unavailable = computed(() => this.disabled() || this.readOnly());
  protected readonly values = computed(() =>
    createNumberRange(this.min(), this.max(), this.step()),
  );
  protected readonly slidesPerView = computed(() => normalizeVisibleItems(this.visibleItems()));
  protected readonly selectedIndex = computed(() => {
    const values = this.values();
    const value = this.value();

    return value === null ? 0 : findClosestIndex(values, value);
  });
  protected readonly selectedValue = computed(() => {
    const value = this.value();

    return value === null ? null : (this.values()[this.selectedIndex()] ?? null);
  });
  protected readonly ariaValueText = computed(() => {
    const value = this.selectedValue();

    return value === null
      ? null
      : `${this.formatter()(value)}${this.unit() ? ` ${this.unit()}` : ''}`;
  });

  private readonly swiper = signal<Swiper | null>(null);
  private onChange: (value: number) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  private readonly syncSwiper = effect(() => {
    const swiper = this.swiper();
    const index = this.selectedIndex();
    const unavailable = this.unavailable();

    if (!swiper) return;

    untracked(() => {
      swiper.update();
      unavailable ? swiper.disable() : swiper.enable();
      swiper.slideTo(index, 0, false);
    });
  });

  writeValue(value: unknown): void {
    if (value === null || value === undefined || value === '') {
      this.value.set(null);
      return;
    }

    const number = Number(value);

    this.value.set(Number.isFinite(number) ? this.closestValue(number) : null);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected handleInit(event: Event): void {
    this.swiper.set(this.getSwiper(event));
  }

  protected handleSlideChange(event: Event): void {
    if (!this.swiper() || this.unavailable()) return;

    const swiper = this.getSwiper(event);
    const value = this.values()[swiper.activeIndex];

    if (value === undefined || value === this.value()) return;

    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  private closestValue(value: number): number {
    const values = this.values();

    return values[findClosestIndex(values, value)];
  }

  private getSwiper(event: Event): Swiper {
    return (event as CustomEvent<[Swiper]>).detail[0];
  }
}
