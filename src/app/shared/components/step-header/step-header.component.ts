import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step-header',
  standalone: true,
  template: `
    <div class="text-center mb-8">
      <h2 class="text-3xl font-black text-white uppercase tracking-wide mb-2">
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p class="text-sm text-gray-400 font-medium">
          {{ subtitle() }}
        </p>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class StepHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
