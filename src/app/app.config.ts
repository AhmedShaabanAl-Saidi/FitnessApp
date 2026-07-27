import {
  ApplicationConfig,
  inject,
  importProvidersFrom,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { languageService } from './core/services/language-service';
import { languageInterceptor } from './core/interceptors/language.interceptor';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff, User, Search, MapPin, Check, X } from 'lucide-angular';
import { ChatService } from './features/chatbot/services/chat-service';
import { GeminiChatService } from './features/chatbot/services/gemini-chat.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([languageInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
      fallbackLang: 'en',
    }),
    provideAppInitializer(() => {
      inject(languageService);
    }),
    importProvidersFrom(LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff, User, Search, MapPin, Check, X })),
    { provide: ChatService, useClass: GeminiChatService },
    // PrimeNG configuration
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
