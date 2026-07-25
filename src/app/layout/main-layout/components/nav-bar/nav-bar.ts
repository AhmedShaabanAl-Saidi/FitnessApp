import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenService } from '../../../../features/auth/services/token.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    ButtonModule,
    DrawerModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    Button,
    TranslatePipe,
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private readonly tokenService = inject(TokenService);

  mobileMenuVisible = signal(false);
  isScrolled = signal(false);
  isLoggedIn = this.tokenService.isLoggedIn;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  navItems = [
    { label: 'NAVBAR.HOME', link: '/home' },
    { label: 'NAVBAR.ABOUT', link: '/about-us' },
    { label: 'NAVBAR.CLASSES', link: '/classes' },
    { label: 'NAVBAR.HEALTHY', link: '/healthy' },
  ];

  toggleMobileMenu() {
    this.mobileMenuVisible.update((val) => !val);
  }
}
