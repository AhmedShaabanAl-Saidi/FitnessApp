import { inject, Injectable, signal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly cookieService = inject(SsrCookieService);
  private readonly TOKEN_KEY = 'token';

  private readonly isLoggedInSignal = signal<boolean>(!!this.getToken());
  readonly isLoggedIn = this.isLoggedInSignal.asReadonly();

  setToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, { path: '/' });
    this.isLoggedInSignal.set(true);
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY) || null;
  }

  removeToken(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
    this.isLoggedInSignal.set(false);
  }
}
