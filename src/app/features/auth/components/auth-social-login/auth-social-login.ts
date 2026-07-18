import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-auth-social-login',
  templateUrl: './auth-social-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AuthSocialLogin {
  protected readonly providers = [
    { id: 'Facebook', icon: 'pi pi-facebook' },
    { id: 'Google', icon: 'pi pi-google' },
    { id: 'Apple', icon: 'pi pi-apple' },
  ];
  protected readonly selectedProvider = signal('');

  protected selectProvider(provider: string): void {
    this.selectedProvider.set(provider);
  }
}
