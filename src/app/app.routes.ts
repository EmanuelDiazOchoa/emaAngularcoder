import { Routes } from '@angular/router';
import { rolGuard } from './core/guards/rol.guard';

export const routes: Routes = [

  // Home -> redirige a alumnos
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },

  // Alumnos (admin y user)
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/alumnos/alumnos.routes')
        .then(m => m.ALUMNOS_ROUTES)
  },

  // Cursos (admin y user)
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/cursos.routes')
        .then(m => m.CURSOS_ROUTES)
  },

  // Usuarios (solo admin)
  {
    path: 'usuarios',
    canMatch: [rolGuard],
    data: { rol: 'admin' },
    loadChildren: () =>
      import('./features/usuarios/usuarios.routes')
        .then(m => m.USUARIOS_ROUTES)
  },

  // Inscripciones (admin y user)
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./features/inscripciones/inscripciones.routes')
        .then(m => m.INSCRIPCIONES_ROUTES)
  },

  // Wildcard (ruta inexistente)
  {
    path: '**',
    redirectTo: 'alumnos'
  }

];
