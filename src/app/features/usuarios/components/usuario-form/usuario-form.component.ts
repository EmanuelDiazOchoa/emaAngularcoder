import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as UsuariosActions from '../../../../store/usuarios/usuarios.actions';
import { selectUsuarioById, selectUsuariosLoading } from '../../../../store/usuarios/usuarios.selectors';
import { Usuario, Rol } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
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
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  usuarioId?: number;
  loading$: Observable<boolean> = this.store.select(selectUsuariosLoading);

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['user' as Rol, Validators.required],
      password: [''],
      telefono: [''],
      direccion: ['']
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = Number(id);
      
      this.store.select(selectUsuarioById(this.usuarioId)).subscribe(usuario => {
        if (usuario) {
          this.form.patchValue(usuario);
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

    const usuarioData = this.form.value;

    if (this.usuarioId) {
    
      this.store.dispatch(UsuariosActions.updateUsuario({ 
        id: this.usuarioId, 
        changes: usuarioData 
      }));
      this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
    
      this.store.dispatch(UsuariosActions.createUsuario({ usuario: usuarioData }));
      this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }

    setTimeout(() => {
      this.router.navigate(['/dashboard/usuarios']);
    }, 500);
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}