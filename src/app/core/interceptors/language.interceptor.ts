import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { languageService } from '../services/language-service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/i18n/')) {
    return next(req);
  }

  const langService = inject(languageService);
  const currentLang = langService.currentLang();

  const modifiedReq = req.clone({
    setHeaders: {
      'accept-language': currentLang,
    },
  });

  return next(modifiedReq);
};
