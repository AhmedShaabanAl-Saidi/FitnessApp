export const AUTH_LAYOUT_ROUTE_DATA_KEY = 'authLayout';

export type AuthLayoutVariant = 'card' | 'step';

export interface AuthLayoutStep {
  current: number;
  total: number;
}

export interface AuthLayoutRouteData {
  variant: AuthLayoutVariant;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  cardTitle?: string;
  cardDescription?: string;
  step?: AuthLayoutStep;
}

export const DEFAULT_LAYOUT_DATA: AuthLayoutRouteData = {
  variant: 'card',
  title: '',
};
