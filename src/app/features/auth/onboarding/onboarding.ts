import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../shared/components/button/button';
import { NumberPicker } from '../../../shared/components/number-picker/number-picker';
import { GOAL_OPTIONS, ONBOARDING_STEPS } from './onboarding-data';
import { AuthService } from '../services/auth.service';
import { SignupRequest } from '../register/register.interface';
import { ActivityLevel } from './onboarding.interface';
import { TokenService } from '../services/token.service';
import { languageService } from '../../../core/services/language-service';
import { Gender } from '../enums/gender.enum';
import { UserPreferenceService } from '../../../core/services/user-preference.service';

@Component({
  selector: 'app-onboarding',
  imports: [FormsModule, TranslatePipe, Button, NumberPicker],
  templateUrl: './onboarding.html',
})
export class Onboarding implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly userPrefService = inject(UserPreferenceService);
  private readonly langService = inject(languageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly steps = ONBOARDING_STEPS;
  protected readonly goalOptions = GOAL_OPTIONS;
  protected readonly currentIndex = signal(0);
  protected readonly currentStep = computed(() => this.steps[this.currentIndex()]);
  protected readonly stepNumber = computed(() => this.currentIndex() + 1);
  protected readonly progressPercentage = computed(
    () => (this.stepNumber() / this.steps.length) * 100,
  );
  protected readonly isFirstStep = computed(() => this.currentIndex() === 0);
  protected readonly age = signal(25);
  protected readonly weight = signal(90);
  protected readonly height = signal(167);
  protected readonly Gender = Gender;
  protected readonly gender = signal<Gender>(Gender.MALE);
  protected readonly goal = signal('Lose weight');
  protected readonly activity = signal('level1');

  private readonly lang$ = toObservable(this.langService.currentLang);

  protected readonly activityLevels = signal<ActivityLevel[]>([]);

  ngOnInit(): void {
    this.lang$
      .pipe(
        switchMap(() => this.authService.getActivityLevels()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (res) => {
          this.activityLevels.set(res.levels.slice(0, 5));
        },
      });
  }

  protected next(): void {
    if (this.currentIndex() === this.steps.length - 1) {
      this.submitSignup();
      return;
    }

    this.currentIndex.update((index) => index + 1);
  }

  protected previous(): void {
    this.currentIndex.update((index) => Math.max(0, index - 1));
  }

  private submitSignup(): void {
    const registrationData = history.state?.registrationData;

    if (!registrationData?.email) {
      void this.router.navigateByUrl('/auth/register');
      return;
    }

    const signupData: SignupRequest = {
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      password: registrationData.password,
      rePassword: registrationData.rePassword,
      gender: this.gender(),
      age: this.age(),
      weight: this.weight(),
      height: this.height(),
      goal: this.goal(),
      activityLevel: this.activity(),
    };

    this.authService
      .signup(signupData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.tokenService.setToken(res.token);
          this.userPrefService.savePreferences(this.goal(), this.activity(), this.weight());
          void this.router.navigateByUrl('/home');
        },
      });
  }
}
