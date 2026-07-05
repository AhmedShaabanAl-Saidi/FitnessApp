import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gender-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gender-selector.component.html',
  styleUrl: './gender-selector.component.css'
})
export class GenderSelectorComponent {
  value = model<'male' | 'female' | null>(null);

  selectGender(gender: 'male' | 'female') {
    this.value.set(gender);
  }
}
