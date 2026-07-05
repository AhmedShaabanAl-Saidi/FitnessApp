import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-progress.component.html',
  styleUrl: './step-progress.component.css'
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
