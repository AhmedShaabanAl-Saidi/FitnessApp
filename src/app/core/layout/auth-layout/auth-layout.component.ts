import { Component, signal, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { AuthPage, AuthPageData } from './interfaces/auth-page-data';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, NgOptimizedImage, RouterOutlet, AuthBackgroundComponent, ThemeSwitcherComponent, LanguageSwitcherComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
  activeComponent = signal<AuthPage | null>(null);
  currentPageData = computed<AuthPageData>(() => this.activeComponent()?.authData() ?? {});

  private pendingComponent = signal<AuthPage | null>(null);

  constructor() {
    effect(() => {
      const component = this.pendingComponent();
      if (component) {
        this.activeComponent.set(component);
        this.pendingComponent.set(null);
      }
    });
  }

  onActivate(component: unknown) {
    if (this.isAuthPage(component)) {
      this.pendingComponent.set(component);
    }
  }

  private isAuthPage(component: unknown): component is AuthPage {
    return (component as AuthPage).authData !== undefined;
  }
}