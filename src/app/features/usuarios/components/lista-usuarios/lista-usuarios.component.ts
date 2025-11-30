import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as UsuariosActions from '../../../../store/usuarios/usuarios.actions';
import { selectAllUsuarios, selectUsuariosLoading, selectUsuariosError } from '../../../../store/usuarios/usuarios.selectors';

import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
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
export class ListaUsuariosComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  usuarios$: Observable<Usuario[]> = this.store.select(selectAllUsuarios);
  loading$: Observable<boolean> = this.store.select(selectUsuariosLoading);
  error$: Observable<string | null> = this.store.select(selectUsuariosError);

  columnas = ['id', 'nombre', 'email', 'rol', 'telefono', 'fecha', 'acciones'];

  ngOnInit(): void {
    
    this.store.dispatch(UsuariosActions.loadUsuarios());
  }

  nuevoUsuario(): void {
    this.router.navigate(['/dashboard/usuarios/nuevo']);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/dashboard/usuarios/editar', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.store.dispatch(UsuariosActions.deleteUsuario({ id }));
      this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  }
}