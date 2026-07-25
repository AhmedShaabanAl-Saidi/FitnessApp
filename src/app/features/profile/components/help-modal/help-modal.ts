import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-help-modal',
  imports: [TranslatePipe],
  templateUrl: './help-modal.html',
})
export class HelpModal {
  @Output() closeModal = new EventEmitter<void>();

  readonly activeFaq = signal<number | null>(null);

  toggleFaq(index: number): void {
    this.activeFaq.update((current) => (current === index ? null : index));
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
