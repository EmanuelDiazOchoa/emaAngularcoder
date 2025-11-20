import { Routes } from '@angular/router';
import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';
import { NuevaInscripcionComponent } from './components/nuevo-inscripcion/nuevo-inscripcion.component';

export const INSCRIPCIONES_ROUTES: Routes = [
  {
    path: '',
    component: ListaInscripcionesComponent
  },
  {
    path: 'nueva',
    component: NuevaInscripcionComponent
  }
];
