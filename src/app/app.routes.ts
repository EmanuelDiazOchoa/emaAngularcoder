import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) 
  },


  {
    path: 'dashboard',
    canMatch: [authGuard],
    children: [

      { 
        path: '', 
        redirectTo: 'alumnos', 
        pathMatch: 'full' 
      },

      { 
        path: 'alumnos', 
        loadChildren: () => import('./features/alumnos/alumnos.routes').then(m => m.ALUMNOS_ROUTES), 
        data: { title: 'Alumnos' } 
      },
      { 
        path: 'cursos', 
        loadChildren: () => import('./features/cursos/cursos.routes').then(m => m.CURSOS_ROUTES), 
        data: { title: 'Cursos' } 
      },
      { 
        path: 'inscripciones', 
        loadChildren: () => import('./features/inscripciones/inscripciones.routes').then(m => m.INSCRIPCIONES_ROUTES), 
        data: { title: 'Inscripciones' } 
      },
      { 
        path: 'usuarios', 
        loadChildren: () => import('./features/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES), 
        data: { title: 'Usuarios' } 
      },
    ]
  },

  { 
    path: '**', 
    redirectTo: '/login' 
  }
];