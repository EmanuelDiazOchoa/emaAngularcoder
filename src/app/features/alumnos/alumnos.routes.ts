import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos';

export const ALUMNOS_ROUTES: Routes = [
  { 
    path: '', 
    component: ListaAlumnosComponent,
    data: { title: 'Lista de Alumnos' }
  },
  { 
    path: 'nuevo', 
    component: AbmAlumnosComponent,
    data: { title: 'Nuevo Alumno' }
  },
  { 
    path: 'editar/:id', 
    component: AbmAlumnosComponent,
    data: { title: 'Editar Alumno' }
  }
];