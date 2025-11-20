import { Routes } from '@angular/router';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';

export const CURSOS_ROUTES: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'nuevo', component: AbmCursosComponent },
  { path: 'editar/:id', component: AbmCursosComponent }
];

