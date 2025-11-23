import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { RolGuard } from './core/guards/rol.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },

  
  {
    path: 'alumnos',
    canMatch: [authGuard],
    loadChildren: () => import('./features/alumnos/alumnos.routes').then(m => m.ALUMNOS_ROUTES)
  },

  
  {
    path: 'cursos',
    canMatch: [authGuard],
    loadChildren: () => import('./features/cursos/cursos.routes').then(m => m.CURSOS_ROUTES)
  },

  
  {
    path: 'inscripciones',
    canMatch: [authGuard],
    loadChildren: () => import('./features/inscripciones/inscripciones.routes').then(m => m.INSCRIPCIONES_ROUTES)
  },

  
  {
    path: 'usuarios',
    canMatch: [RolGuard],
    data: { rol: 'admin' },
    loadChildren: () => import('./features/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },

  {
    path: 'forbidden',
    loadComponent: () => import('./core/pages/forbidden/forbidden.component').then(m => m.ForbiddenComponent)
  },

  { path: '**', redirectTo: 'login' }
];