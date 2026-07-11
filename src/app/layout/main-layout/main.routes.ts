import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('../../features/home/home').then((m) => m.Home),
  },
  {
    path: 'about-us',
    loadComponent: () => import('../../features/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'classes',
    loadComponent: () => import('../../features/classes/classes').then((m) => m.Classes),
  },
];
