import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../../shared/components/button/button';
import { NumberPicker } from '../../../../shared/components/number-picker/number-picker';
import { GOAL_OPTIONS } from '../../../auth/onboarding/onboarding-data';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivityLevel } from '../../../auth/onboarding/onboarding.interface';
import { UserPreferenceService } from '../../../../core/services/user-preference.service';

@Component({
  selector: 'app-edit-preference-modal',
  imports: [CommonModule, FormsModule, TranslatePipe, Button, NumberPicker],
  templateUrl: './edit-preference-modal.html',
})
export class EditPreferenceModal implements OnInit {
  @Input() type: 'goal' | 'level' | 'weight' = 'goal';
  @Input() currentValue: string | number = '';
  @Output() savePreference = new EventEmitter<{ type: 'goal' | 'level' | 'weight'; value: string | number }>();
  @Output() closeModal = new EventEmitter<void>();

  private readonly authService = inject(AuthService);
  private readonly userPrefService = inject(UserPreferenceService);
  private readonly destroyRef = inject(DestroyRef);

  readonly goalOptions = GOAL_OPTIONS;
  readonly activityLevels = signal<ActivityLevel[]>([]);
  readonly selectedValue = signal<string | number>('');

  ngOnInit(): void {
    this.initSelectedValue();
    this.loadActivityLevelsIfNeeded();
  }

  private initSelectedValue(): void {
    if (this.type === 'weight') {
      const parsed = parseInt(String(this.currentValue || this.userPrefService.weight()), 10);
      this.selectedValue.set(isNaN(parsed) ? 90 : parsed);
    } else {
      const fallback = this.type === 'goal' ? this.userPrefService.goal() : this.userPrefService.level();
      this.selectedValue.set(String(this.currentValue || fallback));
    }
  }

  private loadActivityLevelsIfNeeded(): void {
    if (this.type === 'level') {
      this.authService
        .getActivityLevels()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => this.activityLevels.set(res.levels));
    }
  }

  onSave(): void {
    this.savePreference.emit({ type: this.type, value: this.selectedValue() });
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
