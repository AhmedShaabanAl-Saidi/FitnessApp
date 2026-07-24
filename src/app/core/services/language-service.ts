import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal, computed, Renderer2, RendererFactory2, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export type AppLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class languageService {
  private readonly translateService = inject(TranslateService);
  private readonly cookieService = inject(SsrCookieService);
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer: Renderer2;

  private readonly currentLangSignal = signal<AppLanguage>('en');

  readonly currentLang = this.currentLangSignal.asReadonly();
  readonly isRTL = computed(() => this.currentLangSignal() === 'ar');

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const language = this.normalizeLanguage(event.lang);

        this.currentLangSignal.set(language);
        this.updateDocumentDirection(language);
      });

    const initialLanguage = this.normalizeLanguage(
      this.cookieService.get('lang') || this.translateService.getCurrentLang(),
    );

    this.currentLangSignal.set(initialLanguage);
    this.updateDocumentDirection(initialLanguage);
    this.translateService.use(initialLanguage);
  }

  private updateDocumentDirection(language: string): void {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const htmlElement = this.document.documentElement;

    this.renderer.setAttribute(htmlElement, 'dir', direction);
    this.renderer.setAttribute(htmlElement, 'lang', language);
  }

  changeLanguage(language: AppLanguage): void {
    this.translateService.use(language);
    this.cookieService.set('lang', language, { path: '/' });
  }

  private normalizeLanguage(language: string | null | undefined): AppLanguage {
    return language === 'ar' ? 'ar' : 'en';
  }
}
