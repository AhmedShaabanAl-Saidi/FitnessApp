import { Component, signal } from '@angular/core';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { AppInputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormField, AppInputComponent],
  template: `
    <app-input [formField]="userForm.email"></app-input>
  `
})
export class TestComponent {
  user = signal({ email: '', password: '' });

  userForm = form(this.user, (path) => ({
    email: [required(path.email), email(path.email)],
    password: [required(path.password), minLength(path.password, 6)]
  }));
}
