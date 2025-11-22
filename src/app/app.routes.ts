import { Routes } from '@angular/router';
import { rolGuard } from './core/guards/rol.guard';

export const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/alumnos/alumnos.routes')
        .then(m => m.ALUMNOS_ROUTES)
  },

  
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/cursos.routes')
        .then(m => m.CURSOS_ROUTES)
  },

  
  {
    path: 'usuarios',
    canMatch: [rolGuard],       
    data: { rol: 'admin' },      
    loadChildren: () =>
      import('./features/usuarios/usuarios.routes')
        .then(m => m.USUARIOS_ROUTES)
  },

  
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./features/inscripciones/inscripciones.routes')
        .then(m => m.INSCRIPCIONES_ROUTES)
  },

  
  {
    path: '**',
    redirectTo: 'login'
  }

];
