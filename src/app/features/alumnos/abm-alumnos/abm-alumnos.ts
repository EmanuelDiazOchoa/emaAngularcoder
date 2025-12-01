import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as AlumnosActions from '../../../store/alumnos/alumnos.actions';
import { selectAlumnoById, selectAlumnosLoading, selectAllAlumnos } from '../../../store/alumnos/alumnos.selectors';

import { Alumno } from '../../../core/models/alumnos.model';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.html',
  styleUrls: ['./abm-alumnos.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class AbmAlumnosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  alumnoId?: number;
  loading$: Observable<boolean> = this.store.select(selectAlumnosLoading);

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      perfil: ['', Validators.required],
      telefono: [''],
      fechaInscripcion: [new Date().toISOString().split('T')[0]]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumnoId = Number(id);
      
      this.store.select(selectAlumnoById(this.alumnoId)).subscribe(alumno => {
        if (alumno) {
          this.form.patchValue(alumno);
        }
      });
    }
  }


  private async validateEmail(): Promise<boolean> {
    const email = this.form.value.email;
    
    return new Promise((resolve) => {
      this.store.select(selectAllAlumnos).pipe(take(1)).subscribe(alumnos => {
        const emailExists = alumnos.some(alumno => 
          alumno.email.toLowerCase() === email.toLowerCase() && 
          alumno.id !== this.alumnoId
        );
        
        if (emailExists) {
          this.snackBar.open('El email ya está registrado', 'Cerrar', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async guardar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }


    const emailValid = await this.validateEmail();
    if (!emailValid) {
      return;
    }

    const alumnoData = this.form.value;

    if (this.alumnoId) {
  
      this.store.dispatch(AlumnosActions.updateAlumno({ 
        id: this.alumnoId, 
        changes: alumnoData 
      }));
      this.snackBar.open('Alumno actualizado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
  
      this.store.dispatch(AlumnosActions.createAlumno({ alumno: alumnoData }));
      this.snackBar.open('Alumno creado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }

    setTimeout(() => {
      this.router.navigate(['/dashboard/alumnos']);
    }, 500);
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/alumnos']);
  }
}