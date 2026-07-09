import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from '../../../../services/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let mockThemeService: any;

  beforeEach(async () => {
    mockThemeService = {
      toggleTheme: () => {},
      theme: () => 'light',
    };

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent, LucideAngularModule.pick({ Moon, Sun })],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
