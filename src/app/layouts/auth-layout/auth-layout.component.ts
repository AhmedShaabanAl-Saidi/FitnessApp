import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent implements OnInit {
  isDarkMode = signal<boolean>(true);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      this.isDarkMode.set(isDark);
      this.applyTheme(isDark);
    }
  }

  toggleTheme() {
    const nextTheme = !this.isDarkMode();
    this.isDarkMode.set(nextTheme);
    this.applyTheme(nextTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
    }
  }

  private applyTheme(dark: boolean) {
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
