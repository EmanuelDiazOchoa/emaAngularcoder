import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './alumnos/abm-alumnos/abm-alumnos';

export const routes: Routes = [
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'abm-alumnos', component: AbmAlumnosComponent },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
];
