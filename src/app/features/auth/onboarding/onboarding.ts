import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { NumberPicker } from '../../../shared/components/number-picker/number-picker';
import { ACTIVITY_OPTIONS, GOAL_OPTIONS, ONBOARDING_STEPS } from './onboarding-data';

@Component({
  selector: 'app-onboarding',
  imports: [FormsModule, Button, NumberPicker],
  templateUrl: './onboarding.html',
})
export class Onboarding {
  private readonly router = inject(Router);

  protected readonly steps = ONBOARDING_STEPS;
  protected readonly goalOptions = GOAL_OPTIONS;
  protected readonly activityOptions = ACTIVITY_OPTIONS;
  protected readonly currentIndex = signal(0);
  protected readonly currentStep = computed(() => this.steps[this.currentIndex()]);
  protected readonly stepNumber = computed(() => this.currentIndex() + 1);
  protected readonly progressPercentage = computed(
    () => (this.stepNumber() / this.steps.length) * 100,
  );
  protected readonly isFirstStep = computed(() => this.currentIndex() === 0);
  protected readonly age = signal(25);
  protected readonly weight = signal(90);
  protected readonly height = signal(167);
  protected readonly gender = signal<'Male' | 'Female'>('Male');
  protected readonly goal = signal('Lose Weight');
  protected readonly activity = signal('Rookie');

  protected next(): void {
    if (this.currentIndex() === this.steps.length - 1) {
      void this.router.navigateByUrl('/auth/login');
      return;
    }

    this.currentIndex.update((index) => index + 1);
  }

  protected previous(): void {
    this.currentIndex.update((index) => Math.max(0, index - 1));
  }
}
