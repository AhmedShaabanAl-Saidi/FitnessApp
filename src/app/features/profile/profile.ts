import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { languageService } from '../../core/services/language-service';
import { ThemeService } from '../../core/services/theme.service';
import { UserPreferenceService } from '../../core/services/user-preference.service';
import { AuthService } from '../auth/services/auth.service';
import { TokenService } from '../auth/services/token.service';
import { ChangePasswordModal } from './components/change-password-modal/change-password-modal';
import { EditPreferenceModal } from './components/edit-preference-modal/edit-preference-modal';
import { SecurityModal } from './components/security-modal/security-modal';
import { PrivacyPolicyModal } from './components/privacy-policy-modal/privacy-policy-modal';
import { HelpModal } from './components/help-modal/help-modal';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    TranslatePipe,
    ChangePasswordModal,
    EditPreferenceModal,
    SecurityModal,
    PrivacyPolicyModal,
    HelpModal,
  ],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly langService = inject(languageService);
  private readonly themeService = inject(ThemeService);
  private readonly userPrefService = inject(UserPreferenceService);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);

  readonly goal = this.userPrefService.goal;
  readonly level = this.userPrefService.level;
  readonly weight = this.userPrefService.weight;

  readonly isChangePasswordOpen = signal<boolean>(false);
  readonly editPreferenceType = signal<'goal' | 'level' | 'weight' | null>(null);
  readonly isSecurityOpen = signal<boolean>(false);
  readonly isPrivacyOpen = signal<boolean>(false);
  readonly isHelpOpen = signal<boolean>(false);

  readonly currentLang = this.langService.currentLang;
  readonly isDarkMode = this.themeService.isDarkMode;

  readonly currentLangLabel = computed(() =>
    this.currentLang() === 'ar' ? 'العربية' : 'English',
  );

  openChangePassword(): void {
    this.isChangePasswordOpen.set(true);
  }

  closeChangePassword(): void {
    this.isChangePasswordOpen.set(false);
  }

  openEditPreference(type: 'goal' | 'level' | 'weight'): void {
    this.editPreferenceType.set(type);
  }

  closeEditPreference(): void {
    this.editPreferenceType.set(null);
  }

  openSecurity(): void {
    this.isSecurityOpen.set(true);
  }

  closeSecurity(): void {
    this.isSecurityOpen.set(false);
  }

  openPrivacy(): void {
    this.isPrivacyOpen.set(true);
  }

  closePrivacy(): void {
    this.isPrivacyOpen.set(false);
  }

  openHelp(): void {
    this.isHelpOpen.set(true);
  }

  closeHelp(): void {
    this.isHelpOpen.set(false);
  }

  handleSavePreference(event: { type: 'goal' | 'level' | 'weight'; value: string | number }): void {
    if (event.type === 'goal') {
      this.userPrefService.setGoal(String(event.value));
    } else if (event.type === 'level') {
      this.userPrefService.setLevel(String(event.value));
    } else if (event.type === 'weight') {
      this.userPrefService.setWeight(Number(event.value));
    }
    this.closeEditPreference();
  }

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.langService.changeLanguage(nextLang);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService
      .logout()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.tokenService.removeToken();
          void this.router.navigateByUrl('/auth/login');
        }),
      )
      .subscribe();
  }
}
