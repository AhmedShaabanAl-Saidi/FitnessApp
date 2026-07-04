import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gender-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center space-y-6 my-8">
      <!-- Male Option -->
      <button
        type="button"
        (click)="selectGender('male')"
        class="w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer select-none"
        [ngClass]="{
          'bg-[#FF5E00] border-[#FF5E00] scale-105': value() === 'male',
          'bg-transparent border-white/20 hover:border-white/40': value() !== 'male'
        }"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <circle cx="10" cy="14" r="5" />
          <path d="M14 10l6-6M20 4h-4M20 4v4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-white text-xs font-bold mt-1">Male</span>
      </button>

      <!-- Female Option -->
      <button
        type="button"
        (click)="selectGender('female')"
        class="w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer select-none"
        [ngClass]="{
          'bg-[#FF5E00] border-[#FF5E00] scale-105': value() === 'female',
          'bg-transparent border-white/20 hover:border-white/40': value() !== 'female'
        }"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="9" r="5" />
          <path d="M12 14v6M9 17h6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-white text-xs font-bold mt-1">Female</span>
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class GenderSelectorComponent {
  value = model<'male' | 'female' | null>(null);

  selectGender(gender: 'male' | 'female') {
    this.value.set(gender);
  }
}
