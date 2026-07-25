import { DOCUMENT } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/i18n/')) {
    return next(req);
  }

  const translateService = inject(TranslateService, { optional: true });
  const cookieService = inject(SsrCookieService, { optional: true });
  const document = inject(DOCUMENT, { optional: true });

  const currentLang =
    translateService?.currentLang ||
    cookieService?.get('lang') ||
    document?.documentElement?.lang ||
    'en';

  const lang = currentLang === 'ar' ? 'ar' : 'en';

  const modifiedReq = req.clone({
    setHeaders: {
      'accept-language': lang,
    },
  });

  return next(modifiedReq);
};
