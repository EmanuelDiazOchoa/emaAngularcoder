// src/app/features/inscripciones/components/lista-inscripciones/lista-inscripciones.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

import { selectAllInscripciones, selectInscripcionesLoading, selectInscripcionesError } from '../../../../store/inscripciones/inscripciones.selectors';
import { selectAllAlumnos } from '../../../../store/alumnos/alumnos.selectors';
import { selectAllCursos } from '../../../../store/cursos/cursos.selectors';
import { selectAllUsuarios } from '../../../../store/usuarios/usuarios.selectors';
import { selectIsAdmin } from '../../../../store/auth/auth.selectors';

import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { Alumno } from '../../../../core/models/alumnos.model';
import { Curso } from '../../../../core/models/curso.model';
import { Usuario } from '../../../../core/models/usuario.model';

interface InscripcionExtendida extends Inscripcion {
  alumnoNombre?: string;
  cursoNombre?: string;
  usuarioNombre?: string;
}

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
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
  ],
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading$: Observable<boolean> = this.store.select(selectInscripcionesLoading);
  error$: Observable<string | null> = this.store.select(selectInscripcionesError);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);

  inscripcionesExtendidas$: Observable<InscripcionExtendida[]>;

  columnas = ['id', 'alumno', 'curso', 'usuario', 'fecha', 'acciones'];

  constructor() {

    this.inscripcionesExtendidas$ = combineLatest([
      this.store.select(selectAllInscripciones),
      this.store.select(selectAllAlumnos).pipe(startWith([])),
      this.store.select(selectAllCursos).pipe(startWith([])),
      this.store.select(selectAllUsuarios).pipe(startWith([]))
    ]).pipe(
      map(([inscripciones, alumnos, cursos, usuarios]) => {
        return inscripciones.map(inscripcion => {
          const alumno = alumnos.find(a => a.id === Number(inscripcion.alumnoId));
          const curso = cursos.find(c => c.id === Number(inscripcion.cursoId));
          const usuario = usuarios.find(u => u.id === Number(inscripcion.usuarioId));

          return {
            ...inscripcion,
            alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Alumno desconocido',
            cursoNombre: curso ? curso.nombre : 'Curso desconocido',
            usuarioNombre: usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario desconocido'
          };
        });
      })
    );
  }

  ngOnInit(): void {

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