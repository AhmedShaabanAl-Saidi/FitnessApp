import { inject, Injectable, signal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  private readonly cookieService = inject(SsrCookieService);

  readonly goal = signal<string>(this.getGoal());
  readonly level = signal<string>(this.getLevel());
  readonly weight = signal<number>(this.getWeight());

  setGoal(goal: string): void {
    this.cookieService.set('user_goal', goal, { path: '/' });
    this.goal.set(goal);
  }

  getGoal(): string {
    return this.cookieService.get('user_goal') || 'Lose Weight';
  }

  setLevel(level: string): void {
    this.cookieService.set('user_level', level, { path: '/' });
    this.level.set(level);
  }

  getLevel(): string {
    return this.cookieService.get('user_level') || 'Beginner';
  }

  setWeight(weight: number): void {
    this.cookieService.set('user_weight', String(weight), { path: '/' });
    this.weight.set(weight);
  }

  getWeight(): number {
    const stored = this.cookieService.get('user_weight');
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? 90 : parsed;
  }

  savePreferences(goal: string, level: string, weight: number): void {
    this.setGoal(goal);
    this.setLevel(level);
    this.setWeight(weight);
  }
}
