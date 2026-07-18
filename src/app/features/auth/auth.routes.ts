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
        eyebrow: 'Hey There',
        title: 'WELCOME BACK',
        cardTitle: 'Login',
      },
    },
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        eyebrow: 'Hey There',
        title: 'Create An Account',
        cardTitle: 'Register',
      },
    },
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then((m) => m.ForgotPassword),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'Forget Password',
        cardDescription: 'Enter Your Email',
      },
    },
  },
  {
    path: 'otp',
    loadComponent: () => import('./otp/otp').then((m) => m.Otp),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'OTP CODE',
        cardDescription: 'Enter Your OTP, Then Check Your Email',
      },
    },
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
    data: {
      [AUTH_LAYOUT_ROUTE_DATA_KEY]: {
        variant: 'card',
        title: 'Create New Password',
        cardDescription: 'Make Sure It Is 8 Characters Or More',
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
