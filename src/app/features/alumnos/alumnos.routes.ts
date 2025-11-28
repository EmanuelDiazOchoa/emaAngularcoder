import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos';
import { adminGuard } from '../../core/guards/admin.guard';

export const ALUMNOS_ROUTES: Routes = [
  { 
    path: '', 
    component: ListaAlumnosComponent,
    data: { title: 'Lista de Alumnos' }
  },
  { 
    path: 'nuevo', 
    component: AbmAlumnosComponent,
    canActivate: [adminGuard],
    data: { title: 'Nuevo Alumno' }
  },
  { 
    path: 'editar/:id', 
    component: AbmAlumnosComponent,
    canActivate: [adminGuard],
    data: { title: 'Editar Alumno' }
  }
];