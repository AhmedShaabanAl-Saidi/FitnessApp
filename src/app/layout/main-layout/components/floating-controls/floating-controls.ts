import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { languageService } from '../../../../core/services/language-service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-floating-controls',
  imports: [TranslatePipe],
  templateUrl: './floating-controls.html',
})
export class FloatingControls {
  private readonly langService = inject(languageService);
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentLanguage = this.langService.currentLang;
  readonly isDarkMode = this.themeService.isDarkMode;
  readonly isProfilePage = signal<boolean>(false);

  readonly languages = [
    { code: 'en', label: 'EN', nameKey: 'AUTH.COMMON.ENGLISH' },
    { code: 'ar', label: 'AR', nameKey: 'AUTH.COMMON.ARABIC' },
  ];

  constructor() {
    this.checkIsProfilePage(this.router.url);
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.checkIsProfilePage(event.urlAfterRedirects || event.url);
      });
  }

  private checkIsProfilePage(url: string): void {
    this.isProfilePage.set(url.includes('/profile'));
  }

  changeLanguage(code: string): void {
    this.langService.changeLanguage(code as 'en' | 'ar');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(dark: boolean): void {
    if (this.isDarkMode() !== dark) {
      this.themeService.toggleTheme();
    }
  }
}
