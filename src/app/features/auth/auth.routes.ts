import { Routes } from '@angular/router';
import { AUTH_LAYOUT_ROUTE_DATA_KEY } from '../../layout/auth-layout/auth-layout-data';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        eyebrow: 'AUTH.COMMON.HEY_THERE',
        title: 'AUTH.LOGIN.TITLE',
        cardTitle: 'AUTH.LOGIN.CARD_TITLE',
      },
    },
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        eyebrow: 'AUTH.COMMON.HEY_THERE',
        title: 'AUTH.REGISTER.TITLE',
        cardTitle: 'AUTH.REGISTER.CARD_TITLE',
      },
    },
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then((m) => m.ForgotPassword),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'AUTH.FORGOT_PASSWORD.TITLE',
        cardDescription: 'AUTH.FORGOT_PASSWORD.DESCRIPTION',
      },
    },
  },
  {
    path: 'otp',
    loadComponent: () => import('./otp/otp').then((m) => m.Otp),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'AUTH.OTP.TITLE',
        cardDescription: 'AUTH.OTP.DESCRIPTION',
      },
    },
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'AUTH.RESET_PASSWORD.TITLE',
        cardDescription: 'AUTH.RESET_PASSWORD.DESCRIPTION',
      },
    },
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding').then((m) => m.Onboarding),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'step',
        title: '',
      },
    },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
