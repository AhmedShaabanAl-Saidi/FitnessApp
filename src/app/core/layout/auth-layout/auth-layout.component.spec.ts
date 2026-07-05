import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ThemeService } from '../../services/theme.service';
import { languageService } from '../../services/language-service';
import { signal } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    const mockThemeService = {
      theme: signal('light'),
      toggleTheme: () => {}
    };
    const mockLanguageService = {
      currentLang: signal('en'),
      isRTL: signal(false),
      changeLanguage: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [
        AuthLayoutComponent,
        RouterTestingModule,
        LucideAngularModule.pick({ Moon, Sun })
      ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: languageService, useValue: mockLanguageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
