import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AUTH_LAYOUT_ROUTE_DATA_KEY, AuthLayoutRouteData, DEFAULT_LAYOUT_DATA } from './auth-layout-data';

@Component({
  selector: 'app-auth-layout',
  imports: [NgClass, NgOptimizedImage, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly layoutData = signal<AuthLayoutRouteData>(DEFAULT_LAYOUT_DATA);
  protected readonly isCardVariant = computed(() => this.layoutData().variant === 'card');
  protected readonly progressPercentage = computed(() => {
    const step = this.layoutData().step;

    if (!step || step.total <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (step.current / step.total) * 100));
  });

  protected syncLayoutData(): void {
    const routeData = this.activatedRoute.firstChild?.snapshot.data[AUTH_LAYOUT_ROUTE_DATA_KEY];

    this.layoutData.set(isAuthLayoutRouteData(routeData) ? routeData : DEFAULT_LAYOUT_DATA);
  }

  protected resetLayoutData(): void {
    this.layoutData.set(DEFAULT_LAYOUT_DATA);
  }
}

function isAuthLayoutRouteData(value: unknown): value is AuthLayoutRouteData {
  if (!isRecord(value)) {
    return false;
  }

  const hasValidVariant = value['variant'] === 'card' || value['variant'] === 'step';
  const hasValidTitle = typeof value['title'] === 'string';
  const optionalStringsAreValid = ['eyebrow', 'subtitle', 'cardTitle', 'cardDescription'].every(
    (key) => value[key] === undefined || typeof value[key] === 'string',
  );

  return hasValidVariant && hasValidTitle && optionalStringsAreValid && isValidStep(value['step']);
}

function isValidStep(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  const current = value['current'];
  const total = value['total'];

  return (
    typeof current === 'number' &&
    Number.isInteger(current) &&
    typeof total === 'number' &&
    Number.isInteger(total) &&
    current >= 1 &&
    current <= total
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
