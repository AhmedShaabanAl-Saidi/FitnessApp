import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff } from 'lucide-angular';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule,
        LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form fields correctly', () => {
    expect(component.isFormValid()).toBe(false);

    component.email.set('invalid-email');
    fixture.detectChanges();
    expect(component.emailError()?.key).toBe('VALIDATION.EMAIL');

    component.email.set('test@domain.com');
    component.password.set('123456');
    fixture.detectChanges();
    expect(component.isFormValid()).toBe(true);
  });
});
