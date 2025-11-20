import { Routes } from '@angular/router';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/lista-usuarios/lista-usuarios.component')
        .then(m => m.ListaUsuariosComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./components/usuario-form/usuario-form.component')
        .then(m => m.UsuarioFormComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/usuario-form/usuario-form.component')
        .then(m => m.UsuarioFormComponent)
  },
];
