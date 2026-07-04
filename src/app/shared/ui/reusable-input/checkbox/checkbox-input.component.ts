import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';
import { LucideAngularModule } from 'lucide-angular';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-checkbox-input',
  imports: [CommonModule, LucideAngularModule, InputErrorComponent],
  templateUrl: './checkbox-input.component.html',
})
export class CheckboxInputComponent extends BaseInputComponent {
  toggle() {
    if (this.disabled()) return;
    this.value.update((val: boolean) => !val);
    this.onBlur.emit();
  }
}
