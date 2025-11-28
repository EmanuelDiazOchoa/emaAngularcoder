import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as InscripcionesActions from '../../../../store/inscripciones/inscripciones.actions';
import * as AlumnosActions from '../../../../store/alumnos/alumnos.actions';
import * as CursosActions from '../../../../store/cursos/cursos.actions';
import { selectAllAlumnos } from '../../../../store/alumnos/alumnos.selectors';
import { selectAllCursos } from '../../../../store/cursos/cursos.selectors';
import { selectInscripcionesLoading } from '../../../../store/inscripciones/inscripciones.selectors';
import { selectUser } from '../../../../store/auth/auth.selectors';

import { Alumno } from '../../../../core/models/alumnos.model';
import { Curso } from '../../../../core/models/curso.model';

@Component({
  selector: 'app-nuevo-inscripcion',
  templateUrl: './nuevo-inscripcion.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class NuevoInscripcionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  loading$: Observable<boolean> = this.store.select(selectInscripcionesLoading);

  
  alumnos$: Observable<Alumno[]> = this.store.select(selectAllAlumnos);
  cursos$: Observable<Curso[]> = this.store.select(selectAllCursos);

  ngOnInit(): void {
    this.initForm();
   
    this.store.dispatch(AlumnosActions.loadAlumnos());
    this.store.dispatch(CursosActions.loadCursos());
  }

  private initForm(): void {
    this.form = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required]
    });
  }

  guardar(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.snackBar.open('Complete todos los campos', 'Cerrar', { duration: 3000 });
    return;
  }

  
  this.store.select(selectUser).pipe(take(1)).subscribe(user => {
    if (!user) {
      this.snackBar.open('Usuario no identificado', 'Cerrar', { duration: 3000 });
      return;
    }

    const inscripcionData = {
      alumnoId: Number(this.form.value.alumnoId),
      cursoId: Number(this.form.value.cursoId),
      usuarioId: user.id,
      fecha: new Date().toISOString()
    };

    this.store.dispatch(InscripcionesActions.createInscripcion({ inscripcion: inscripcionData }));
    this.snackBar.open('Inscripción creada', 'Cerrar', { duration: 3000 });
    
    setTimeout(() => this.router.navigate(['/dashboard/inscripciones']), 500);
  });
}
}