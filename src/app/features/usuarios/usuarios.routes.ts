import { Routes } from '@angular/router';
import { RolGuard } from '../../core/guards/rol.guard';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    canMatch: [RolGuard],
    loadComponent: () =>
      import('./components/lista-usuarios/lista-usuarios.component')
        .then(m => m.ListaUsuariosComponent)
  },
  {
    path: 'nuevo',
    canMatch: [RolGuard],
    loadComponent: () =>
      import('./components/usuario-form/usuario-form.component')
        .then(m => m.UsuarioFormComponent)
  },
  {
    path: 'editar/:id',
    canMatch: [RolGuard],
    loadComponent: () =>
      import('./components/usuario-form/usuario-form.component')
        .then(m => m.UsuarioFormComponent)
  },
];