import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as CursosActions from '../../../../store/cursos/cursos.actions';
import { selectCursoById, selectCursosLoading } from '../../../../store/cursos/cursos.selectors';

import { Curso } from '../../../../core/models/curso.model';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class AbmCursosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  cursoId?: number;
  loading$: Observable<boolean> = this.store.select(selectCursosLoading);

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      duracion: ['', Validators.required],
      cantidadClases: ['', [Validators.required, Validators.min(1)]],
      profesor: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoId = Number(id);
      
      this.store.select(selectCursoById(this.cursoId)).subscribe(curso => {
        if (curso) {
          this.form.patchValue(curso);
        }
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const cursoData = this.form.value;

    if (this.cursoId) {
      
      this.store.dispatch(CursosActions.updateCurso({ 
        id: this.cursoId, 
        changes: cursoData 
      }));
      this.snackBar.open('Curso actualizado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
      
      this.store.dispatch(CursosActions.createCurso({ curso: cursoData }));
      this.snackBar.open('Curso creado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }

    
    setTimeout(() => {
      this.router.navigate(['/dashboard/cursos']);
    }, 500);
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/cursos']);
  }
}
