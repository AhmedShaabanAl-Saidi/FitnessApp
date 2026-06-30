import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [htmlFor]="for" class="text-xs uppercase font-semibold tracking-wider text-gray-600 dark:text-gray-400 pl-1 transition-colors duration-500">
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    :host {
      display: inline-block;
      margin-bottom: 0.25rem;
    }
  `]
})
export class AppLabelComponent {
  @Input() for = '';
}
