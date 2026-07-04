import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      class="w-full py-4 mt-2 bg-[#FF5E00] hover:bg-[#E05300] disabled:bg-[#FF5E00]/50 disabled:cursor-not-allowed text-white font-bold text-[15px] rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
    >
      <!-- Optional Loading Spinner -->
      @if (loading) {
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }
      <span>{{ label }}</span>
    </button>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class AppButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
}
