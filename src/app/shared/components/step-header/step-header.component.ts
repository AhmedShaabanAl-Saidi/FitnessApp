import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step-header',
  standalone: true,
  templateUrl: './step-header.component.html',
  styleUrl: './step-header.component.css'
})
export class StepHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
}
