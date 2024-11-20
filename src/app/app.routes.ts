import { Routes } from '@angular/router';
import { LoginPageComponent } from './presentation/page/auth/login/login-page.component';
import { DashboardLayoutComponent } from './presentation/layout/dashboard/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./presentation/page/home/home.component'),
        title: 'Home',
        data: { icon: 'home' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./presentation/page/brands/list/list-brands.component'),
        title: 'Marcas',
        data: { icon: 'inventory_2' },
      },
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
];
