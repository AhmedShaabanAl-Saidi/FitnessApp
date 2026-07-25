import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly cookieService = inject(SsrCookieService);
  private readonly TOKEN_KEY = 'token';

  setToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, { path: '/' });
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY) || null;
  }

  removeToken(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}