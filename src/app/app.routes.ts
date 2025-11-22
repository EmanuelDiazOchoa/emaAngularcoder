import { Routes } from '@angular/router';
import { rolGuard } from './core/guards/rol.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'alumnos',
    loadChildren: () => import('./features/alumnos/alumnos.routes').then(m => m.ALUMNOS_ROUTES)
  },

  {
    path: 'usuarios',
    canMatch: [rolGuard],
    data: { rol: 'admin' },
    loadChildren: () => import('./features/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },

  {
    path: 'forbidden',
    loadComponent: () => import('./core/pages/forbidden/forbidden.component').then(m => m.ForbiddenComponent)
  },

  { path: '**', redirectTo: 'login' }
];
