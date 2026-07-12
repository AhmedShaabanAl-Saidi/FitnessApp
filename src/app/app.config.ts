import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff, User, Search, MapPin, Check, X } from 'lucide-angular';
import { ChatService } from './features/chatbot/services/chat-service';
import { GeminiChatService } from './features/chatbot/services/gemini-chat.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    provideTranslateService({ fallbackLang: 'en' }),
    importProvidersFrom(LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff, User, Search, MapPin, Check, X })),
    { provide: ChatService, useClass: GeminiChatService },

    // PrimeNG configuration
    providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};

