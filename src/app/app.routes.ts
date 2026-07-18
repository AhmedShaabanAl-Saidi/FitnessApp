import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    loadChildren: () => import('./layout/main-layout/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
