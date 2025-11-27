import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
import { selectAllInscripciones, selectInscripcionesLoading, selectInscripcionesError } from '../../../../store/inscripciones/inscripciones.selectors';
import { selectAllAlumnos } from '../../../../store/alumnos/alumnos.selectors';
import { selectAllCursos } from '../../../../store/cursos/cursos.selectors';
import { selectIsAdmin } from '../../../../store/auth/auth.selectors';

import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { Alumno } from '../../../../core/models/alumnos.model';
import { Curso } from '../../../../core/models/curso.model';

import { UsuariosService } from '../../../../core/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario.model';

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
  ]
})
export class ListaInscripcionesComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private usuariosService = inject(UsuariosService);


  inscripciones$: Observable<Inscripcion[]> = this.store.select(selectAllInscripciones);
  loading$: Observable<boolean> = this.store.select(selectInscripcionesLoading);
  error$: Observable<string | null> = this.store.select(selectInscripcionesError);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);

  alumnos$: Observable<Alumno[]> = this.store.select(selectAllAlumnos);
  cursos$: Observable<Curso[]> = this.store.select(selectAllCursos);
  usuarios: Usuario[] = [];

  columnas = ['id', 'alumno', 'curso', 'usuario', 'fecha', 'acciones'];

  private alumnosMap = new Map<number, string>();
  private cursosMap = new Map<number, string>();
  private usuariosMap = new Map<number, string>();

  ngOnInit(): void {
    
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.store.dispatch(AlumnosActions.loadAlumnos());
    this.store.dispatch(CursosActions.loadCursos());

    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      usuarios.forEach(u => {
        this.usuariosMap.set(u.id, `${u.nombre} ${u.apellido}`);
      });
    });

    this.alumnos$.subscribe(alumnos => {
      alumnos.forEach(a => {
        this.alumnosMap.set(a.id, `${a.nombre} ${a.apellido}`);
      });
    });

    this.cursos$.subscribe(cursos => {
      cursos.forEach(c => {
        this.cursosMap.set(c.id, c.nombre);
      });
    });
  }

  getAlumnoNombre(id: number): string {
    return this.alumnosMap.get(id) || 'Alumno desconocido';
  }

  getCursoNombre(id: number): string {
    return this.cursosMap.get(id) || 'Curso desconocido';
  }

  getUsuarioNombre(id: number): string {
    return this.usuariosMap.get(id) || 'Usuario desconocido';
  }

  nuevaInscripcion(): void {
    this.router.navigate(['/dashboard/inscripciones/nueva']);
  }

  eliminarInscripcion(id: number): void {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
      this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  }
}