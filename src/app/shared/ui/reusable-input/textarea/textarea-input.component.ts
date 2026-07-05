import { Component, input } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-textarea-input',
  imports: [InputErrorComponent],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.css',
  host: {
    class: 'block w-full',
  },
})
export class TextareaInputComponent extends BaseInputComponent {
  rows = input<number>(4);
  resize = input<'none' | 'vertical' | 'horizontal' | 'both'>('none');
}
