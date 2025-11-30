import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as InscripcionesActions from '../../../../store/inscripciones/inscripciones.actions';
import * as AlumnosActions from '../../../../store/alumnos/alumnos.actions';
import * as CursosActions from '../../../../store/cursos/cursos.actions';
import * as UsuariosActions from '../../../../store/usuarios/usuarios.actions';

import { 
  selectAllInscripciones, 
  selectInscripcionesLoading, 
  selectInscripcionesError 
} from '../../../../store/inscripciones/inscripciones.selectors';
import { selectAllAlumnos } from '../../../../store/alumnos/alumnos.selectors';
import { selectAllCursos } from '../../../../store/cursos/cursos.selectors';
import { selectAllUsuarios } from '../../../../store/usuarios/usuarios.selectors';
import { selectIsAdmin } from '../../../../store/auth/auth.selectors';
import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { Alumno } from '../../../../core/models/alumnos.model';
import { Curso } from '../../../../core/models/curso.model';
import { Usuario } from '../../../../core/models/usuario.model';


interface InscripcionConDatos extends Inscripcion {
  alumnoNombre: string;
  cursoNombre: string;
  usuarioNombre: string;
}

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class ListaInscripcionesComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading$: Observable<boolean> = this.store.select(selectInscripcionesLoading);
  error$: Observable<string | null> = this.store.select(selectInscripcionesError);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);

  inscripcionesConDatos$: Observable<InscripcionConDatos[]>;

  columnas = ['id', 'alumno', 'curso', 'usuario', 'fecha', 'acciones'];

  constructor() {
   
    this.inscripcionesConDatos$ = combineLatest([
      this.store.select(selectAllInscripciones),
      this.store.select(selectAllAlumnos),
      this.store.select(selectAllCursos),
      this.store.select(selectAllUsuarios)
    ]).pipe(
      tap(([inscripciones, alumnos, cursos, usuarios]) => {
      
        console.log('📊 Datos cargados:');
        console.log('  - Inscripciones:', inscripciones.length);
        console.log('  - Alumnos:', alumnos.length);
        console.log('  - Cursos:', cursos.length);
        console.log('  - Usuarios:', usuarios.length);
      }),
      map(([inscripciones, alumnos, cursos, usuarios]) => {
        return inscripciones.map(inscripcion => {
   
          const alumno = alumnos.find(a => {
         
            return a.id === Number(inscripcion.alumnoId) || 
                   a.id.toString() === inscripcion.alumnoId.toString();
          });
          const curso = cursos.find(c => {
            return c.id === Number(inscripcion.cursoId) || 
                   c.id.toString() === inscripcion.cursoId.toString();
          });


          const usuario = usuarios.find(u => {
            return u.id === Number(inscripcion.usuarioId) || 
                   u.id.toString() === inscripcion.usuarioId.toString();
          });

          const resultado: InscripcionConDatos = {
            ...inscripcion,
            alumnoNombre: alumno 
              ? `${alumno.nombre} ${alumno.apellido}` 
              : `Alumno ID: ${inscripcion.alumnoId} (no encontrado)`,
            cursoNombre: curso 
              ? curso.nombre 
              : `Curso ID: ${inscripcion.cursoId} (no encontrado)`,
            usuarioNombre: usuario 
              ? `${usuario.nombre} ${usuario.apellido}` 
              : `Usuario ID: ${inscripcion.usuarioId} (no encontrado)`
          };

          console.log('✅ Inscripción resuelta:', {
            id: inscripcion.id,
            alumnoId: inscripcion.alumnoId,
            alumnoNombre: resultado.alumnoNombre,
            cursoNombre: resultado.cursoNombre,
            usuarioNombre: resultado.usuarioNombre
          });

          return resultado;
        });
      })
    );
  }

  ngOnInit(): void {
    console.log('🚀 Iniciando carga de datos...');
    

    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.store.dispatch(AlumnosActions.loadAlumnos());
    this.store.dispatch(CursosActions.loadCursos());
    this.store.dispatch(UsuariosActions.loadUsuarios());
  }

  nuevaInscripcion(): void {
    this.router.navigate(['/dashboard/inscripciones/nueva']);
  }

  eliminarInscripcion(id: number): void {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
      this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }
}