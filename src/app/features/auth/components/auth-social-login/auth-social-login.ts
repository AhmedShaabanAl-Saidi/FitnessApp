import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-social-login',
  imports: [TranslatePipe],
  templateUrl: './auth-social-login.html',
  host: { class: 'block' },
})
export class AuthSocialLogin {
  protected readonly providers = [
    { id: 'facebook', labelKey: 'AUTH.SOCIAL.FACEBOOK', icon: 'pi pi-facebook' },
    { id: 'google', labelKey: 'AUTH.SOCIAL.GOOGLE', icon: 'pi pi-google' },
    { id: 'apple', labelKey: 'AUTH.SOCIAL.APPLE', icon: 'pi pi-apple' },
  ];
  protected readonly selectedProviderKey = signal('');

  protected selectProvider(providerKey: string): void {
    this.selectedProviderKey.set(providerKey);
  }
}
