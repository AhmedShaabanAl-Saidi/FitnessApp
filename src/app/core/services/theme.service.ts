import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal, Renderer2, RendererFactory2 } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppTheme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly cookieService = inject(SsrCookieService);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer: Renderer2;

  private readonly themeSignal = signal<AppTheme>(AppTheme.DARK);
  readonly currentTheme = this.themeSignal.asReadonly();
  readonly isDarkMode = signal<boolean>(true);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const cookieTheme = this.cookieService.get('theme');
    const initialTheme = this.normalizeTheme(cookieTheme);
    this.setTheme(initialTheme);
  }

  setTheme(theme: AppTheme): void {
    this.themeSignal.set(theme);
    const htmlElement = this.document.documentElement;

    if (theme === AppTheme.DARK) {
      this.renderer.addClass(htmlElement, 'dark');
      this.isDarkMode.set(true);
    } else {
      this.renderer.removeClass(htmlElement, 'dark');
      this.isDarkMode.set(false);
    }

    this.cookieService.set('theme', theme, { path: '/' });
  }

  toggleTheme(): void {
    const nextTheme: AppTheme =
      this.themeSignal() === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    this.setTheme(nextTheme);
  }

  private normalizeTheme(value: string | null | undefined): AppTheme {
    if (value === AppTheme.LIGHT) {
      return AppTheme.LIGHT;
    }
    return AppTheme.DARK;
  }
}
