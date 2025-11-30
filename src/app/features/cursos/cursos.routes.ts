import { Routes } from '@angular/router';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { adminGuard } from '../../core/guards/admin.guard';

export const CURSOS_ROUTES: Routes = [
  { 
    path: '', 
    component: ListaCursosComponent 
  },
  { 
    path: 'nuevo', 
    component: AbmCursosComponent,
    canActivate: [adminGuard]
  },
  { 
    path: 'editar/:id', 
    component: AbmCursosComponent,
    canActivate: [adminGuard]
  }
];

