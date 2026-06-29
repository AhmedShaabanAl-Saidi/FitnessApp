import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
@Component({
  selector: 'app-button',
  imports: [NgClass, NgStyle],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'solid' | 'outline' | 'ghost'>('solid');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  showArrow = input<boolean>(false);
  fullWidth = input<boolean>(false);

  onClick = output<MouseEvent>();
  buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex relative items-center font-semibold tracking-wide transition-all duration-300 select-none';

    const sizeClass = this.fullWidth()
      ? 'w-full py-3.5 px-6 rounded-xl justify-center'
      : 'py-2.5 px-8 rounded-full justify-between';

    let interactiveClass = '';
    if (this.disabled()) {
      interactiveClass = 'cursor-not-allowed';
    } else {
      interactiveClass = 'cursor-pointer active:scale-[0.98]';
      if (this.variant() === 'solid') interactiveClass += ' hover:opacity-90';
      if (this.variant() === 'outline')
        interactiveClass += ' hover:bg-[var(--color-primary-brand)] hover:text-white';
      if (this.variant() === 'ghost') interactiveClass += ' hover:bg-gray-100';
    }

    return `${baseClasses} ${sizeClass} ${interactiveClass}`;
  });

  buttonStyles = computed(() => {
    if (this.disabled()) {
      return {
        'background-color': '#D3D3D3',
        color: '#8C8C8C',
        border: '1px solid transparent',
      };
    }

    const isSolid = this.variant() === 'solid';
    const isOutline = this.variant() === 'outline';

    return {
      'background-color': isSolid ? 'var(--color-primary-brand)' : 'transparent',
      color: isSolid ? '#FFFFFF' : 'var(--color-primary-brand)',
      border: isOutline ? '1px solid var(--color-primary-brand)' : '1px solid transparent',
    };
  });

  arrowClasses = computed(() => {
    const baseArrow =
      'flex shrink-0 items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 bg-primary-brand';
    const positionClass = this.fullWidth() ? 'mx-2' : 'absolute -right-4';
    const variantClass =
      this.variant() === 'ghost' ? 'text-black border-none' : 'text-white border-white';

    return `${baseArrow} ${positionClass} ${variantClass}`;
  });
}
