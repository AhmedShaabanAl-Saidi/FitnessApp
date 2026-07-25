import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy-modal',
  imports: [TranslatePipe],
  templateUrl: './privacy-policy-modal.html',
})
export class PrivacyPolicyModal {
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
