import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos';
import { AbmAlumnos } from './alumnos/abm-alumnos/abm-alumnos';

export const routes: Routes = [
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'abm-alumnos', component: AbmAlumnos },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
];
