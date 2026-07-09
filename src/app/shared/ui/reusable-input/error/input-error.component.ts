import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'lib-input-error',
  templateUrl: './input-error.component.html',
  imports: [LucideAngularModule, TranslatePipe, TranslateDirective],
})
export class InputErrorComponent {
  error = input<{ key: string; params?: any } | null>(null);
  touched = input<boolean>(false);
  customType = input<string>('');
  errorId = input<string>('');

  get haveError(): boolean {
    return !!(this.touched() && this.error());
  }

  get errorInfo(): { key: string; params?: any } {
    return this.error() || { key: '' };
  }
}
