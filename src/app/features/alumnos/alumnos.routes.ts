import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos';

export const ALUMNOS_ROUTES: Routes = [
  { path: '', component: ListaAlumnosComponent },
  { path: 'abm', component: AbmAlumnosComponent }
];
