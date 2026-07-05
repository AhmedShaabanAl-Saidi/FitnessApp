import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'lib-base-input',
  imports: [],
  template: '',
})
export abstract class BaseInputComponent {
  private readonly generatedId = `field-${Math.random().toString(36).slice(2, 10)}`;
  
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  icon = input<string>('');
  disabled = input<boolean>(false);
  
  onBlur = output<void>();
  
  // Validation state passed from parent
  error = input<{ key: string; params?: any } | null>(null);
  touched = input<boolean>(false);

  // Model binding for the value
  value = model<any>('');

  readonly inputId = computed(() => {
    const explicitId = this.id().trim();
    if (explicitId) return explicitId;

    const normalizedLabel = this.label()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return normalizedLabel
      ? `${normalizedLabel}-${this.generatedId}`
      : this.generatedId;
  });
  
  readonly errorId = computed(() => `${this.inputId()}-error`);

  get Invalid(): boolean {
    return !!(this.touched() && this.error());
  }

  get describedBy(): string | null {
    return this.Invalid ? this.errorId() : null;
  }
}
