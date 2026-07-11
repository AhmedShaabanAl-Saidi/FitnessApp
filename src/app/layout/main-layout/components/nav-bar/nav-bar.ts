import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Button } from '../../../../shared/components/button/button';
@Component({
  selector: 'app-nav-bar',
  imports: [ButtonModule, DrawerModule, CommonModule, RouterLink, RouterLinkActive, Button],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  mobileMenuVisible = signal(false);
  isScrolled = signal(false);
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'About', link: '/about-us' },
    { label: 'Classes', link: '/classes' },
    { label: 'Healthy', link: '/healthy' },
  ];

  toggleMobileMenu() {
    this.mobileMenuVisible.update((val) => !val);
  }
}
