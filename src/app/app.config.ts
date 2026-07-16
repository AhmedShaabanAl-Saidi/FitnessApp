import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  LucideAngularModule,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Search,
  MapPin,
  Check,
  X,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
      fallbackLang: 'en',
    }),
    importProvidersFrom(
      LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff, User, Search, MapPin, Check, X }),
    ),

    // PrimeNG configuration
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
