import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-16 h-16 flex items-center justify-center mx-auto">
      <svg class="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <!-- Background circle -->
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
        <!-- Progress arc -->
        <circle cx="32" cy="32" r="28" fill="none" stroke="#FF5E00" stroke-width="3"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference()"
          [attr.stroke-dashoffset]="dashOffset()" />
      </svg>
      <span class="absolute text-white text-sm font-bold">
        {{ currentStep() }}/{{ totalSteps() }}
      </span>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class StepProgressComponent {
  currentStep = input.required<number>();
  totalSteps = input<number>(6);

  circumference = computed(() => 2 * Math.PI * 28);

  dashOffset = computed(() => {
    const progress = this.currentStep() / this.totalSteps();
    return this.circumference() * (1 - progress);
  });
}
