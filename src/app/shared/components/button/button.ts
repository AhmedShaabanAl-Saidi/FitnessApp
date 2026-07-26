import { Component, computed, input, output } from '@angular/core';
import { BASE_CLASSES, SIZE_CLASSES, VARIANT_CLASSES } from './button.interfaces';
import type { ButtonSize, ButtonType, ButtonVariant } from './button.interfaces';
export type { ButtonSize, ButtonType, ButtonVariant } from './button.interfaces';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  host: {
    '[class.w-full]': 'fullWidth()',
    '[class.block]': 'fullWidth()',
    '[class.inline-block]': '!fullWidth()',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('solid');
  readonly type = input<ButtonType>('button');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly showArrow = input(false);
  readonly fullWidth = input(false);

  readonly onClick = output<MouseEvent>();

  protected readonly unavailable = computed(() => this.disabled() || this.loading());
  protected readonly displayArrow = computed(() => this.showArrow() && !this.unavailable());
  protected readonly buttonClasses = computed(() =>
    [
      BASE_CLASSES,
      'rounded-full',
      this.fullWidth() ? 'w-full justify-center' : 'justify-between',
      SIZE_CLASSES[this.size()],
      this.unavailable()
        ? 'cursor-not-allowed border-transparent bg-[#D3D3D3] text-[#8C8C8C]'
        : `cursor-pointer active:scale-[0.98] ${VARIANT_CLASSES[this.variant()]}`,
    ].join(' '),
  );

  protected readonly arrowClasses = computed(() => {
    const isFullWidth = this.fullWidth();
    const config = {
      sm: { size: 'size-[24px]', offset: isFullWidth ? 'ms-2' : '-me-6', text: 'text-[10px]' },
      md: { size: 'size-[30px]', offset: isFullWidth ? 'ms-2' : '-me-8', text: 'text-xs' },
      lg: { size: 'size-[34px]', offset: isFullWidth ? 'ms-2' : '-me-9', text: 'text-sm' },
    }[this.size()];

    return [
      `relative flex ${config.size} ${config.text} shrink-0 items-center justify-center rounded-full bg-[#FF4100] transition-all duration-300`,
      config.offset,
      this.variant() === 'ghost' ? 'border-0 text-black' : 'border-2 border-white text-white',
    ].join(' ');
  });

  protected handleClick(event: MouseEvent): void {
    if (this.unavailable()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.onClick.emit(event);
  }
}
