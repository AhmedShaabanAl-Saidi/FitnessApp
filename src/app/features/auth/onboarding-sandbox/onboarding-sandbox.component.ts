import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepProgressComponent } from '../../../shared/components/step-progress/step-progress.component';
import { StepHeaderComponent } from '../../../shared/components/step-header/step-header.component';
import { GenderSelectorComponent } from '../../../shared/components/gender-selector/gender-selector.component';
import { NumberScrollPickerComponent } from '../../../shared/components/number-scroll-picker/number-scroll-picker.component';
import { AppButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-onboarding-sandbox',
  standalone: true,
  imports: [
    CommonModule,
    StepProgressComponent,
    StepHeaderComponent,
    GenderSelectorComponent,
    NumberScrollPickerComponent,
    AppButtonComponent
  ],
  template: `
    <div class="w-full flex flex-col text-left">
      <!-- Step progress circle -->
      <app-step-progress [currentStep]="currentStep()" [totalSteps]="4"></app-step-progress>

      <!-- Card Container -->
      <div class="relative mt-6 bg-gradient-to-b from-white/[0.08] to-transparent border border-dashed border-white/20 rounded-[20px] p-8 md:p-10">
        
        <!-- Step 1: Gender Selector -->
        @if (currentStep() === 1) {
          <app-step-header 
            title="Tell Us About Yourself!" 
            subtitle="We Need To Know Your Gender">
          </app-step-header>
          
          <app-gender-selector [(value)]="selectedGender"></app-gender-selector>
          
          <app-button 
            [disabled]="!selectedGender()" 
            label="Next" 
            (click)="nextStep()">
          </app-button>
        }

        <!-- Step 2: Age Picker -->
        @if (currentStep() === 2) {
          <app-step-header 
            title="How Old Are You ?" 
            subtitle="This Helps Us Create Your Personalized Plan">
          </app-step-header>
          
          <app-number-scroll-picker 
            [min]="10" 
            [max]="100" 
            [(value)]="age">
          </app-number-scroll-picker>
          
          <div class="flex space-x-4 mt-6">
            <button (click)="prevStep()" class="w-1/3 py-4 text-white/60 hover:text-white font-bold transition-all">Back</button>
            <app-button class="flex-1" label="Next" (click)="nextStep()"></app-button>
          </div>
        }

        <!-- Step 3: Weight Picker -->
        @if (currentStep() === 3) {
          <app-step-header 
            title="What Is Your Weight ?" 
            subtitle="This Helps Us Create Your Personalized Plan">
          </app-step-header>
          
          <app-number-scroll-picker 
            [min]="30" 
            [max]="200" 
            unit="Kg" 
            [(value)]="weight">
          </app-number-scroll-picker>
          
          <div class="flex space-x-4 mt-6">
            <button (click)="prevStep()" class="w-1/3 py-4 text-white/60 hover:text-white font-bold transition-all">Back</button>
            <app-button class="flex-1" label="Next" (click)="nextStep()"></app-button>
          </div>
        }

        <!-- Step 4: Height Picker -->
        @if (currentStep() === 4) {
          <app-step-header 
            title="What Is Your Height ?" 
            subtitle="This Helps Us Create Your Personalized Plan">
          </app-step-header>
          
          <app-number-scroll-picker 
            [min]="100" 
            [max]="220" 
            unit="CM" 
            [(value)]="height">
          </app-number-scroll-picker>
          
          <div class="flex space-x-4 mt-6">
            <button (click)="prevStep()" class="w-1/3 py-4 text-white/60 hover:text-white font-bold transition-all">Back</button>
            <app-button class="flex-1" label="Done" (click)="submitOnboarding()"></app-button>
          </div>
        }

        <!-- Summary / Success screen -->
        @if (currentStep() === 5) {
          <div class="text-center py-6">
            <h3 class="text-2xl font-black text-[#FF5E00] uppercase mb-4">Onboarding Complete!</h3>
            <div class="space-y-2 text-left bg-white/5 rounded-xl p-4 text-gray-300 mb-6">
              <p><strong>Gender:</strong> {{ selectedGender() | uppercase }}</p>
              <p><strong>Age:</strong> {{ age() }} Years</p>
              <p><strong>Weight:</strong> {{ weight() }} Kg</p>
              <p><strong>Height:</strong> {{ height() }} CM</p>
            </div>
            <app-button label="Restart Demo" (click)="restart()"></app-button>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
  `]
})
export class OnboardingSandboxComponent {
  currentStep = signal<number>(1);
  selectedGender = signal<'male' | 'female' | null>(null);
  age = signal<number>(25);
  weight = signal<number>(90);
  height = signal<number>(167);

  nextStep() {
    this.currentStep.update(s => s + 1);
  }

  prevStep() {
    this.currentStep.update(s => Math.max(1, s - 1));
  }

  submitOnboarding() {
    this.currentStep.set(5);
  }

  restart() {
    this.selectedGender.set(null);
    this.age.set(25);
    this.weight.set(90);
    this.height.set(167);
    this.currentStep.set(1);
  }
}
